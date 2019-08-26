<template>
  <v-layout wrap mt-4 mb-4>
    <v-flex xs12 sm6 mb-2 :class="{ 'pr-4': $vuetify.breakpoint.smAndUp }">
      <h3 class="title mb-3">{{ $t('links.title') }}</h3>
      {{ (projectLinks.length) ? '' : $t('projectLinks.noLinks') }}
      <v-layout wrap v-if="projectLinks.length">
        <v-flex text-truncate xs12 py-2 v-for="(link, index) in projectLinks" :key="index">
          <a :href="link.href" target="_blank">{{ link.href }}</a>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="projectData.id && !isProjectTerminated && !isProjectCompleted" xs12 mb-2 sm6 :class="{ 'pl-4': $vuetify.breakpoint.smAndUp }">
      <v-layout wrap justify-end>
        <v-flex sm12>
          <v-text-field
            class="link"
            ref="search"
            v-model="link"
            color="primary"
            :label="$t('common.fields.link')"
          ></v-text-field>
        </v-flex>
        <v-btn
          class="search-btn"
          color="primary"
          :disabled="!link.trim() || disabledBtn"
          @click="addProjectLink"
        >{{ $t('common.btns.addLink') }}</v-btn>
      </v-layout>
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
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ProjectLinks',
    data() {
      return {
        link: '',
        disabledBtn: false,
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
      };
    },
    computed: {
      projectLinks() {
        return this.$store.getters['projects/getProjectLinks'];
      },
      projectData() {
        return this.$store.getters['projects/getProjectData'];
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
    },
    async created() {
      if (this.$route.params.id) {
        await this.$store.dispatch('projects/getProjectLinks', this.$route.params.id);
      }
    },
    methods: {
      async addProjectLink() {
        if (!this.link.trim()) {
            return;
        }

        this.disabledBtn = true;

        const response = await this.$store.dispatch('projects/addProjectLink', { link: this.link, projectId: this.$route.params.id });

          if (response.data.success) {
            this.link = '';
            await this.$store.dispatch('projects/getProjectLinks', this.$route.params.id);
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.disabledBtn = false;
            }, 3000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.disabledBtn = false;
            this.errorAlert.msg = response.data.error.message;
          }
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>