<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar
        class="headline justify-center"
        color="light-blue"
      >{{ (isProjectCreationPath) ? $t('createProject.title') : $t('editProject.title') }}</v-toolbar>
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
                  :isProjectDataSaved="isProjectDataSaved"
                  @getProjectDetails="getProjectDetails"
                  @setIP="setIP"
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
                      <!-- Project links tab -->
                      <project-links />
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
                      <project-history />
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
              <v-layout align-center class="btns-wrapper">
                <v-btn
                  type="button"
                  @click="saveProject"
                  :disabled="areBtnsDisabled"
                  v-if="!areFieldsDisabled"
                  color="info mb-2 mt-2"
                  depressed
                >{{ $t('common.btns.save') }}</v-btn>
                <v-btn
                  type="button"
                  v-if="isProjectCreated && isAdminPath && isAdmin"
                  @click="deleteProject"
                  :disabled="areBtnsDisabled"
                  class="error mb-2 mt-2 mx-2"
                  depressed
                >{{ $t('common.btns.delete') }}</v-btn>
                <v-btn
                  type="button"
                  v-if="isProjectInProgress && isAdminPath && isAdmin"
                  @click="terminateProject"
                  :disabled="areBtnsDisabled"
                  class="error mb-2 mt-2 mx-2"
                  depressed
                >{{ $t('common.btns.terminate') }}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
      <set-ip-dialog v-if="isProjectCreated" />
      <delete-project-dialog v-if="isProjectCreated && isAdminPath && isAdmin" />
      <terminate-project-dialog v-if="isProjectInProgress && isAdminPath && isAdmin" />
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import ProjectDetails from '@/shared/components/ProjectDetails';
  import ProjectDocuments from '@/shared/components/ProjectDocuments';
  import ProjectLinks from '@/shared/components/ProjectLinks';
  import ProjectHistory from '@/shared/components/ProjectHistory';
  import SetIpDialog from '@/shared/components/SetIpDialog';
  import DeleteProjectDialog from '@/modules/Admin/components/projects/DeleteProjectDialog';
  import TerminateProjectDialog from '@/modules/Admin/components/projects/TerminateProjectDialog';

  export default {
    name: 'ProjectForm',
    async beforeRouteEnter(to, from, next) {
      await store.commit('global/setRoles', null, { root: true });

      if ((to.name === 'create-project' || to.name === 'create-new-project') && (store.getters['global/getRoles'].indexOf('ro') !== -1 ||
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
      ProjectLinks,
      ProjectHistory,
      SetIpDialog,
      DeleteProjectDialog,
      TerminateProjectDialog,
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
        isProjectDataSaved: true,
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
      isProjectCreated() {
        return this.projectData.status === 'Created';
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
      isAdmin() {
        return this.roles.indexOf('a') !== -1;
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
        await this.$store.dispatch('projects/getAvailablePartners');
      },
      '$route': async function() {
        if (this.$route.name === 'create-project') {
          this.$store.commit('projects/setProjectData', null);
          this.$store.commit('projects/setProjectProperties', {});
          this.$store.commit('projects/setProjectDocumentsData', []);
          this.$store.commit('projects/setProjectLinks', []);
          this.$store.commit('projects/setProjectHistory', []);
          this.$refs.projectForm.reset();
          await this.$store.dispatch('projects/getProjectProperties');
        }
      },
    },
    async created() {
      await this.$store.dispatch('projects/getProjectProperties');

      if (this.$route.params.id) {
        const { data } = await this.$store.dispatch('projects/getProjectInfo', this.$route.params.id);
        if (data && !data.success && this.isAdminPath) {
          return this.$router.push({ name: 'not-found' });
        }

        if (data && !data.success && this.isClientPath) {
          return this.$router.push({ name: 'not-found-page' });
        }

        await this.$store.dispatch('projects/getProjectDocuments', this.$route.params.id);
      }
    },
    destroyed() {
      this.$store.commit('projects/setProjectData', null);
      this.$store.commit('projects/setProjectProperties', {});
      this.$store.commit('projects/setProjectDocumentsData', []);
      this.$store.commit('admin/projects/setTerminateProjectReasons', []);
    },
    methods: {
      async saveProject() {
        this.$refs.projectDetails.validateProjectProgrammeField();
        this.activeTab = 0;
        if (this.$refs.projectForm.validate() && this.$refs.projectDetails.validateProjectProgrammeField() && this.$refs.projectDocuments.getProjectDocuments()) {
          this.$refs.projectDetails.getProjectDetails();
          this.$refs.projectDocuments.getProjectDocuments();

          this.areBtnsDisabled = true;
          this.isProjectDataSaved = false;

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
              this.isProjectDataSaved = true;
              if (this.isAdminPath) {
                this.$router.push('/admin/projects');
              } else {
                this.$router.push('/dashboard/projects');
              }
            }, 3000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.isProjectDataSaved = true;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
      getProjectDetails(projectData) {
        this.credentials = projectData;
      },
      getProjectDocuments(projectDocumetsData) {
        this.credentials.documents = projectDocumetsData;
      },
      async setIP() {
        this.$refs.projectDetails.validateProjectProgrammeField();
        this.activeTab = 0;
        if (this.$refs.projectForm.validate() && this.$refs.projectDetails.validateProjectProgrammeField() && this.$refs.projectDocuments.getProjectDocuments()) {
          this.$refs.projectDetails.getProjectDetails();
          this.$refs.projectDocuments.getProjectDocuments();

          this.areBtnsDisabled = true;
          this.isProjectDataSaved = false;

          let response = await this.$store.dispatch('projects/editProject', this.credentials);

          if (response.data.success) {
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(async () => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              await this.$store.dispatch('projects/getAvailablePartners');
              await this.$store.dispatch('projects/getProjectInfo', this.$route.params.id);
              this.areBtnsDisabled = false;
              this.isProjectDataSaved = true;
              this.$store.commit('projects/toggleSetIpDialogState', true);
            }, 3000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.isProjectDataSaved = true;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
      deleteProject() {
        this.$store.commit('admin/projects/toggleDeleteProjectDialogState', true);
      },
      async terminateProject() {
        await this.$store.dispatch('admin/projects/getTerminationReasons');
        this.$store.commit('admin/projects/toggleTerminateProjectDialogState', true);
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>