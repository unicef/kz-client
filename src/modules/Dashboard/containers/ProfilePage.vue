<template>
  <v-layout wrap class="container">
    <profile-navigation v-if="!showStepByStepForm" />
    <router-view/>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import ProfileNavigation from '../components/profile/ProfileNavigation';

  export default {
    name: 'ProfilePage',
    components: {
      ProfileNavigation,
    },
    async beforeRouteEnter(to, from, next) {
      if (store.getters['auth/auth/isAuthenticated']) {
        next();
      } else {
        next('/auth/login');
      }
    },
    computed: {
      showStepByStepForm() {
        return this.$store.getters['dashboard/profile/showForm'];
      },
    },
    destroyed() {
      this.$store.commit('users/setUserData', null);
      this.$store.commit('users/setCompanyData', null);
      this.$store.commit('users/setCompanyDocumentsData', []);
      this.$store.commit('users/setPartnerCompanyProperties', {});
    },
  };
</script>

<style lang="scss" scoped>

</style>