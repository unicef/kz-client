<template>
  <v-layout wrap container px-0 py-0>
    <v-flex xs12 mt-4>
      <v-toolbar
        class="headline justify-center"
        color="light-blue"
      >{{ $t('companyProjects.title') }}</v-toolbar>
      <v-card>
        <v-container class="company-projects" :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-text>
            <v-flex xs12 pb-2>
                <h2 class="title mb-2 font-weight-bold">{{ companyData.name }}</h2>
                </v-flex>
                <partner-status />
          </v-card-text>
          <!-- PARTNER PROJECTS BLOCK -->
          <projects-table />
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import ProjectsTable from '@/modules/Dashboard/components/projects/ProjectsTable';
  import PartnerStatus from './PartnerStatus';

  export default {
    name: 'CompanyProjects',
    components: {
      PartnerStatus,
      ProjectsTable,
    },
    data() {
      return {
      };
    },
    computed: {
      companyData() {
        return this.$store.getters['dashboard/users/getPartnerInfo'];
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>