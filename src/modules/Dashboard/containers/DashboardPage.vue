<template>
  <dashboard-layout>
    <router-view />
  </dashboard-layout>
</template>

<script>
  import store from '@/store';
  import DashboardLayout from './../layouts/DashboardLayout';

  export default {
    name: 'DashboardPage',
    components: {
      DashboardLayout,
    },
    async beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        store.commit('auth/auth/setAuthenticated', false);
        localStorage.removeItem('me');
        store.commit('global/setRoles', null, { root: true });
      }
      if (store.getters['auth/auth/isAuthenticated'] ||
          (!store.getters['auth/auth/isAuthenticated'] &&
          to.path.includes('terms'))) {
        next();
      } else {
        next('/auth/login');
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>