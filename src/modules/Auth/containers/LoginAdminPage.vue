<template>
  <v-layout justify-center column class="container mt-4 mb-4">
    <login-form />
  </v-layout>
</template>

<script>
  import store from '@/store';
  import LoginForm from '../components/LoginForm';

  export default {
    name: 'LoginAdminPage',
    components: {
      LoginForm,
    },
    async beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem('token')) {
        store.commit('auth/auth/setAuthenticated', false);
        localStorage.removeItem('me');
        store.commit('global/setRoles', null, { root: true });
      }
      if (store.getters['auth/auth/isAuthenticated']) {
          next('/admin');
      } else {
          next();
      }
    },
  };
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.login-form {
  max-width: 600px;
  margin: 0 auto;

  .btns-wrapper {
    justify-content: space-around;
    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
.headline {
  text-align: center;
  text-transform: uppercase;
  color: #fff;

  @media (max-width: 767px) {
    font-size: 18px !important;
  }
}
</style>
