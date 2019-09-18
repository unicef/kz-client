<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline face justify-center" color="light-blue">{{ $t('face.title') }}</v-toolbar>
      <v-form ref="faceRequestForm" lazy-validation>
        <v-card class="face-request-form">
          <v-container class="pt-4 pb-4" text-xs-center v-if="!isDataLoaded">
              <v-progress-circular :size="70" :width="7" color="info" indeterminate></v-progress-circular>
          </v-container>
          <v-container v-show="isDataLoaded" :class="{ 'pt-4': $vuetify.breakpoint.xs }">
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class="{ 'px-0': $vuetify.breakpoint.xs }"
              >
                <!-- Face request info -->
                <face-request-info />

                <!-- Face request details -->
                <face-request-details
                  ref="faceRequestDetails"
                  :faceRequestData="faceRequestData"
                  :faceRequestActivities="faceRequestActivities"
                  @getFaceRequestDetails="getFaceRequestDetails"
                />
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-layout justify-end wrap align-center class="btns-wrapper">
                <v-btn
                  type="button"
                  v-if="isMyStage"
                  @click="submitRequest"
                  color="info mb-2 mt-2"
                  depressed
                >{{ $t('common.btns.submitForm') }}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
    <face-request-dialog v-if="isMyStage" />
  </v-layout>
</template>

<script>
  import store from '@/store';
  import FaceRequestInfo from './FaceRequestInfo';
  import FaceRequestDetails from './FaceRequestDetails';
  import FaceRequestDialog from './FaceRequestDialog';

  export default {
    name: 'FaceRequestForm',
    async beforeRouteEnter(to, from, next) {
      await store.commit('global/setRoles', null, { root: true });
      if ((to.name === 'create-face-request') && (store.getters['global/getRoles'].indexOf('ra') !== -1)) {
        next();
      } else if (to.path.includes('/face-request/')) {
        next();
      } else {
        next({ name: 'not-found-page' });
      }
    },
    components: {
      FaceRequestInfo,
      FaceRequestDetails,
      FaceRequestDialog,
    },
    data() {
      return {
        credentials: {},
        isDataLoaded: false,
      };
    },
    computed: {
      faceRequestData() {
        return this.$store.getters['projects/getFaceRequestData'];
      },
      projectInfo() {
        return this.$store.getters['projects/getProjectInfo'];
      },
      faceRequestActivities() {
        return this.$store.getters['projects/getFaceRequestActivities'];
      },
      isFaceRequestCreationPath() {
        return this.$route.path.indexOf('create-face-request') !== -1;
      },
      isFaceRequestPath() {
        return this.$route.path.indexOf('/face-request/') !== -1;
      },
      isMyStage() {
        return this.$store.getters['projects/getMyRequestStageState'];
      },
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isUnicefUser() {
        return this.roles.indexOf('ro') !== -1 || this.roles.indexOf('bo') !== -1 || this.roles.indexOf('dr') !== -1 || this.roles.indexOf('om') !== -1;
      },
    },
    watch: {
      /* eslint-disable */
      '$i18n.locale': async function() {
        await this.$store.dispatch('projects/getFaceRequestProperties');
        await this.$store.dispatch('projects/getFaceRequestUsers');
      },
    },
    async created() {
      const { data } = await this.$store.dispatch('projects/getProjectShortInfo', this.$route.params.id);

      if (data && !data.success) {
        return this.$router.push({ name: 'not-found-page' });
      }

      await this.$store.dispatch('projects/getFaceRequestProperties');

      if (this.$route.params.faceRequestId && this.isFaceRequestPath) {
        const { data } = await this.$store.dispatch('projects/getFaceRequestData', this.$route.params.faceRequestId);

        if (data && !data.success) {
          this.$router.push({ name: 'not-found-page' });
        }
      }

      const faceActivitiesData = await this.$store.dispatch('projects/getFaceRequestActivities', {
          requestId: this.$route.params.faceRequestId || '',
          projectId: this.$route.params.id
        });

      if (faceActivitiesData.data && !faceActivitiesData.data.success) {
        this.$router.push({ name: 'not-found-page' });
      } else {
        this.isDataLoaded = true;
      }

      if (this.isUnicefUser) {
        await this.$store.dispatch('projects/getFaceRequestUsers');
      }
    },
    destroyed() {
      this.$store.commit('projects/setFaceRequestData', null);
      this.$store.commit('projects/setFaceRequestProperties', {});
      this.$store.commit('projects/setFaceRequestActivities', null);
      this.$store.commit('projects/setMyRequestStageState', false);
      this.$store.commit('projects/setFaceRequestUsers', []);
    },
    methods: {
      async submitRequest() {
        if (this.$refs.faceRequestForm.validate() && this.$refs.faceRequestDetails.checkApproval()) {
          this.$refs.faceRequestDetails.getFaceRequestDetails();

          this.$store.commit('projects/setSubmittedFaceRequestData', this.credentials);
          this.$store.commit('projects/toggleFaceRequestDialogState', true);
        }
      },
      getFaceRequestDetails(faceRequestData) {
        console.log('face request data in parent: ', faceRequestData);
        this.credentials = faceRequestData;
      },
    //   getProjectDocuments(projectDocumetsData) {
    //     this.credentials.documents = projectDocumetsData;
    //   },
    },
  };
</script>

<style lang="scss" scoped>
</style>