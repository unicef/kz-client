<template>
	<admin-layout>
		<router-view />
	</admin-layout>
</template>

<script>
  import store from '@/store';
  import AdminLayout from './../layouts/AdminLayout';

  export default {
    name: 'AdminPage',
    components: {
      AdminLayout,
    },
    async beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        store.commit('auth/auth/setAuthenticated', false);
        localStorage.removeItem('me');
        store.commit('global/setRoles', null, { root: true });
      }
      if (store.getters['auth/auth/isAuthenticated'] && store.getters['global/getRoles'].indexOf('a') !== -1) {
        next();
      } else if (store.getters['auth/auth/isAuthenticated'] && store.getters['global/getRoles'].indexOf('a') === -1) {
        next('/dashboard');
      } else {
        next('/auth/login-admin');
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>