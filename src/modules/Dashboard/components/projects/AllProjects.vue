<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('allProjects.title') }}</v-toolbar>
      <projects-table />
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import ProjectsTable from '@/modules/Dashboard/components/projects/ProjectsTable';

  export default {
    name: 'AllProjects',
    async beforeRouteEnter(to, from, next) {
      await store.commit('global/setRoles', null, { root: true });

      if (store.getters['global/getRoles'].indexOf('a') !== -1 || store.getters['global/getRoles'].indexOf('ro') !== -1 || store.getters['global/getRoles'].indexOf('bo') !== -1 || store.getters['global/getRoles'].indexOf('dr') !== -1 || store.getters['global/getRoles'].indexOf('om') !== -1 || store.getters['global/getRoles'].indexOf('d') !== -1) {
        next();
      } else {
        next('/dashboard/projects');
      }
    },
    components: {
      ProjectsTable,
    },
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>