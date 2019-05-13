<template>
  <v-layout justify-center column class="container mt-4 mb-4">
    <v-layout wrap class='mb-1'>
       <v-flex xs12 sm12 md6 lg6>
         <login-form />
       </v-flex>
       <v-flex xs12 sm12 md6 lg6>
         <v-card class="mt-4 create-account">
          <v-toolbar class="headline justify-center" color="light-blue">No account yet?</v-toolbar>
            <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
              <v-card-text class="justify-center">
                <p>Manage projects and recieve latest news</p>
                <v-btn type="btn" @click="createAccount" color="info mb-2 mt-2 mx-0" depressed>Create an account</v-btn>
              </v-card-text>
            </v-container>
         </v-card>
       </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import LoginForm from '../components/LoginForm';

  export default {
    name: 'LoginPage',
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
          next('/dashboard');
      } else {
          next();
      }
    },
    methods: {
      createAccount() {
        this.$router.push({ name: 'register' });
      },
    },
  };
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.create-account {
  max-width: 400px;
  margin: 0 auto;
}
.headline {
  text-align: center;
  text-transform: uppercase;
  color: #fff;

  @media (max-width: 960px) {
    font-size: 18px !important;
  }
}
</style>
