<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('createProject.title') }}</v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';

  export default {
    name: 'CreateProjectForm',
    beforeRouteEnter(to, from, next) {
      if (store.getters['global/getRoles'].indexOf('ro') !== -1 || store.getters['global/getRoles'].indexOf('bo') !== -1 || store.getters['global/getRoles'].indexOf('dr') !== -1 || store.getters['global/getRoles'].indexOf('om') !== -1) {
        next();
      } else {
        next('/dashboard/projects');
      }
    },
    components: {
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