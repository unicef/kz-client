<template>
  <v-layout wrap class="container">
    <router-view/>
  </v-layout>
</template>

<script>
import store from '@/store';

export default {
    name: 'PartnersPage',
    async beforeRouteEnter(to, from, next) {
      await store.commit('global/setRoles', null, { root: true });

      if (store.getters['global/getRoles'].indexOf('ro') !== -1 || store.getters['global/getRoles'].indexOf('bo') !== -1 || store.getters['global/getRoles'].indexOf('dr') !== -1 || store.getters['global/getRoles'].indexOf('om') !== -1) {
        next();
      } else {
        next('/dashboard');
      }
    },
};
</script>

<style lang="scss" scoped>

</style>