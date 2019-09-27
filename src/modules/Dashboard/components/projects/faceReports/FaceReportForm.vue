<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline face justify-center" color="light-blue">{{ $t('face.title') }}</v-toolbar>
      <v-form ref="faceReportForm" lazy-validation>
        <v-card class="face-report-form">
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
                <!-- Face report info -->
                <face-report-info />

                <!-- Face report details -->
                <face-report-details
                  ref="faceReportDetails"
                  :faceReportData="faceReportData"
                  :faceReportActivities="faceReportActivities"
                  @getFaceReportDetails="getFaceReportDetails"
                />

                <!-- Face report documents -->
                <face-report-documents
                  ref="faceReportDocuments"
                  @getFaceReportDocuments="getFaceReportDocuments"
                />


                <v-flex xs12 class="mb-4" v-if="faceReportData.isValid">
                  <!-- Validation block (by authorised person) -->
                  <h3>{{ $t('common.fields.validationText') }}</h3>
                  <div class="mt-2">
                    <v-icon color="success">done_outline</v-icon>
                    <span
                      class="subheading green--text ml-2"
                    >{{ $t('common.fields.approvedCheckboxText') }}</span>
                  </div>
                </v-flex>
                <v-flex xs12 class="mt-4 mb-4" v-if="faceReportData.isAuthorised">
                  <!-- Authorization block (by UNICEF) -->
                  <h3>{{ $t('common.fields.authorizationText') }}</h3>
                  <div class="mt-2">
                    <v-icon color="success">done_outline</v-icon>
                    <span
                      class="subheading green--text ml-2"
                    >{{ $t('common.fields.approvedCheckboxText') }}</span>
                  </div>
                  <v-layout
                    justify-end
                    class="mt-4"
                    v-if="faceReportData.successedAt"
                  >{{ $t('common.fields.date') }}: {{ faceReportData.successedAt }}</v-layout>
                </v-flex>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-layout justify-end wrap align-center class="btns-wrapper">
                <v-btn
                  type="button"
                  v-if="isMyStage"
                  @click="submitReport"
                  color="info mb-2 mt-2"
                  depressed
                >{{ $t('common.btns.submitForm') }}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
    <face-report-dialog v-if="isMyStage" />
  </v-layout>
</template>

<script>
  import store from '@/store';
  import FaceReportInfo from './FaceReportInfo';
  import FaceReportDetails from './FaceReportDetails';
  import FaceReportDialog from './FaceReportDialog';
  import FaceReportDocuments from './FaceReportDocuments';

  export default {
    name: 'FaceReportForm',
    async beforeRouteEnter(to, from, next) {
      await store.commit('global/setRoles', null, { root: true });
      if ((to.name === 'create-face-report') && (store.getters['global/getRoles'].indexOf('ra') !== -1)) {
        next();
      } else if (to.path.includes('/face-report/')) {
        next();
      } else {
        next({ name: 'not-found-page' });
      }
    },
    components: {
      FaceReportInfo,
      FaceReportDetails,
      FaceReportDialog,
      FaceReportDocuments,
    },
    data() {
      return {
        credentials: {},
        isDataLoaded: false,
      };
    },
    computed: {
      faceReportData() {
        return this.$store.getters['projects/getFaceReportData'];
      },
      isJustificationDocRequired() {
        return this.$store.getters['projects/getFaceReportJustificationDocRequiredState'];
      },
      projectInfo() {
        return this.$store.getters['projects/getProjectInfo'];
      },
      faceReportActivities() {
        return this.$store.getters['projects/getFaceReportActivities'];
      },
      isFaceReportCreationPath() {
        return this.$route.path.indexOf('create-face-report') !== -1;
      },
      isFaceReportPath() {
        return this.$route.path.indexOf('/face-report/') !== -1;
      },
      isMyStage() {
        return this.$store.getters['projects/getMyReportStageState'];
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
        await this.$store.dispatch('projects/getFaceReportProperties', this.$route.params.id);
        await this.$store.dispatch('projects/getProjectShortInfo', this.$route.params.id);
        if (this.isUnicefUser) {
          await this.$store.dispatch('projects/getFaceReportUsers');
        }
      },
    },
    async created() {
      const { data } = await this.$store.dispatch('projects/getProjectShortInfo', this.$route.params.id);

      if (data && !data.success) {
        return this.$router.push({ name: 'not-found-page' });
      }

      await this.$store.dispatch('projects/getFaceReportProperties', this.$route.params.id);

      if (this.$route.params.faceReportId && this.isFaceReportPath) {
        const { data } = await this.$store.dispatch('projects/getFaceReportData', this.$route.params.faceReportId);

        if (data && !data.success) {
          this.$router.push({ name: 'not-found-page' });
        }
      }

      const faceActivitiesData = await this.$store.dispatch('projects/getFaceReportActivities', {
          reportId: this.$route.params.faceReportId || '',
          projectId: this.$route.params.id
        });

      if (faceActivitiesData.data && !faceActivitiesData.data.success) {
        this.$router.push({ name: 'not-found-page' });
      } else {
        this.isDataLoaded = true;
      }

      if (this.isUnicefUser) {
        await this.$store.dispatch('projects/getFaceReportUsers');
      }
    },
    destroyed() {
      this.$store.commit('projects/setFaceReportData', null);
      this.$store.commit('projects/setFaceReportProperties', {});
      this.$store.commit('projects/setFaceReportActivities', null);
      this.$store.commit('projects/setMyReportStageState', false);
      this.$store.commit('projects/setFaceReportUsers', []);
      this.$store.commit('projects/setFaceReportJustificationDocRequiredState', false);
    },
    methods: {
      async submitReport() {
        if (this.$refs.faceReportForm.validate() && this.$refs.faceReportDetails.checkApproval() && this.$refs.faceReportDocuments.validateData()) {
          this.$refs.faceReportDetails.getFaceReportDetails();
          this.$refs.faceReportDocuments.getFaceReportDocuments();

          this.$store.commit('projects/setSubmittedFaceReportData', this.credentials);
          this.$store.commit('projects/toggleFaceReportDialogState', true);
        }
      },
      getFaceReportDetails(faceReportData) {
        this.credentials = faceReportData;
      },
      getFaceReportDocuments(faceReportsDocumentsData) {
        faceReportsDocumentsData.forEach((item, index) => {
          this.credentials[item.key] = item.id;
        });

        if (!this.isJustificationDocRequired) {
          this.credentials.justificationDocId = null;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>