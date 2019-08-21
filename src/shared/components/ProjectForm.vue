<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ (isProjectCreationPath) ? $t('createProject.title') : $t('editProject.title') }}</v-toolbar>
      <v-form ref="projectForm" lazy-validation>
        <v-card class="project-form">
          <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class="{ 'px-0': $vuetify.breakpoint.xs }"
              >
                <!-- Project details -->
                <project-details
                  ref="projectDetails"
                  :projectData="projectData"
                  @getProjectDetails="getProjectDetails"
                />

                <!-- Project tabs -->
                <v-flex xs12 mt-4>
                  <v-tabs show-arrows grow v-model="activeTab">
                    <v-tab>{{ $t('common.projectTabs.documents') }}</v-tab>
                    <v-tab>{{ $t('common.projectTabs.reports') }}</v-tab>
                    <v-tab>{{ $t('common.projectTabs.links') }}</v-tab>
                    <v-tab>{{ $t('common.projectTabs.face') }}</v-tab>
                    <v-tab>{{ $t('common.projectTabs.tranches') }}</v-tab>
                    <v-tab>{{ $t('common.projectTabs.history') }}</v-tab>
                    <v-tab-item>
                      <!-- Project documents tab -->
                      <project-documents
                        ref="projectDocuments"
                        :projectDocumentsData="projectDocumentsData"
                        @getProjectDocuments="getProjectDocuments"
                      />
                    </v-tab-item>
                    <v-tab-item>
                      <!-- Project reports -->
                      Project reports
                    </v-tab-item>
                    <v-tab-item>
                      <!-- Project links -->
                      Project links
                    </v-tab-item>
                    <v-tab-item>
                      <!-- Project FACE -->
                      Project FACE
                    </v-tab-item>
                    <v-tab-item>
                      <!-- Project tranches -->
                      Project tranches
                    </v-tab-item>
                    <v-tab-item>
                      <!-- Project history -->
                      Project history
                    </v-tab-item>
                  </v-tabs>
                </v-flex>

                <!-- Alert -->
                <v-layout row v-if="errorAlert.state">
                  <v-flex sm12>
                    <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
                <!-- Success -->
                <v-layout row v-if="successAlert.state">
                  <v-flex sm12>
                    <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-layout align-center class="btns-wrapper" v-if="!areFieldsDisabled">
                <v-btn
                  type="button"
                  @click="saveProject"
                  :disabled="areBtnsDisabled"
                  color="info mb-2 mt-2"
                  depressed
                >{{ $t('common.btns.save') }}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import ProjectDetails from '@/shared/components/ProjectDetails';
  import ProjectDocuments from '@/shared/components/ProjectDocuments';

  export default {
    name: 'ProjectForm',
    async beforeRouteEnter(to, from, next) {
      await store.commit('global/setRoles', null, { root: true });

      if (to.name === 'create-project' && (store.getters['global/getRoles'].indexOf('ro') !== -1 ||
          store.getters['global/getRoles'].indexOf('bo') !== -1 ||
          store.getters['global/getRoles'].indexOf('dr') !== -1 ||
          store.getters['global/getRoles'].indexOf('om') !== -1)) {
        next();
      } else if (to.path.includes('projects/project/')) {
        next();
      } else {
        next('/dashboard/projects');
      }
    },
    components: {
      ProjectDetails,
      ProjectDocuments,
    },
    data() {
      return {
        credentials: {},
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
        areBtnsDisabled: false,
        activeTab: null,
      };
    },
    computed: {
      projectData() {
        return this.$store.getters['projects/getProjectData'];
      },
      projectDocumentsData() {
        return this.$store.getters['projects/getProjectDocumentsData'];
      },
      isProjectCreationPath() {
        return this.$route.path.indexOf('create-project') !== -1;
      },
      isAdminPath() {
        return this.$route.path.indexOf('admin') !== -1;
      },
      isClientPath() {
        return this.$route.path.indexOf('dashboard') !== -1;
      },
      isProjectInProgress() {
        return this.projectData.status === 'In progress';
      },
      isProjectTerminated() {
        return this.projectData.status === 'Project termination';
      },
      isProjectCompleted() {
        return this.projectData.status === 'Completed';
      },
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isPartner() {
        return this.roles.indexOf('ra') !== -1 || this.roles.indexOf('ap') !== -1;
      },
      isDonor() {
        return this.roles.indexOf('d') !== -1;
      },
      areFieldsDisabled() {
          return this.isPartner ||
                 this.isDonor ||
                 this.isProjectInProgress ||
                 this.isProjectTerminated ||
                 this.isProjectCompleted;
      },
    },
    watch: {
      /* eslint-disable */
      '$i18n.locale': async function() {
        await this.$store.dispatch('projects/getProjectProperties');
      },
      '$route': async function() {
        if (this.$route.name === 'create-project') {
          this.$store.commit('projects/setProjectData', null);
          this.$store.commit('projects/setProjectProperties', {});
          this.$store.commit('projects/setProjectDocumentsData', []);
          this.$refs.projectForm.reset();
          await this.$store.dispatch('projects/getProjectProperties');
        }
      },
    },
    async created() {
      await this.$store.dispatch('projects/getProjectProperties');

      if (this.$route.params.id) {
        await this.$store.dispatch('projects/getProjectInfo', this.$route.params.id);
        await this.$store.dispatch('projects/getProjectDocuments', this.$route.params.id);
      }
    },
    destroyed() {
      this.$store.commit('projects/setProjectData', null);
      this.$store.commit('projects/setProjectProperties', {});
      this.$store.commit('projects/setProjectDocumentsData', []);
    },
    methods: {
      async saveProject() {
        this.$refs.projectDetails.validateProjectProgrammeField();
        this.activeTab = 0;
        if (this.$refs.projectForm.validate() && this.$refs.projectDetails.validateProjectProgrammeField() && this.$refs.projectDocuments.getProjectDocuments()) {
          this.$refs.projectDetails.getProjectDetails();
          this.$refs.projectDocuments.getProjectDocuments();

          this.areBtnsDisabled = true;

          let response;
          if (this.isProjectCreationPath) {
            response = await this.$store.dispatch('projects/createProject', this.credentials);
          } else {
            response = await this.$store.dispatch('projects/editProject', this.credentials);
          }

          if (response.data.success) {
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.areBtnsDisabled = false;
              if (this.isAdminPath) {
                this.$router.push('/admin/projects');
              } else {
                this.$router.push('/dashboard/projects');
              }
            }, 2000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
      getProjectDetails(projectData) {
        this.credentials = projectData;
        console.log('project details in parent', this.credentials);
      },
      getProjectDocuments(projectDocumetsData) {
        this.credentials.documents = projectDocumetsData;
        console.log('project documents in parent', this.credentials.documents);
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>