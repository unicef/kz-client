<template>
  <v-layout wrap class="container">
    <profile-navigation />
    <router-view/>
  </v-layout>
</template>

<script>
  import ProfileNavigation from '../components/profile/ProfileNavigation';

  export default {
    name: 'ProfilePage',
    components: {
      ProfileNavigation,
    },
    async created() {
      const myId = JSON.parse(localStorage.getItem('me')).id;
      const myUser = await this.$store.dispatch('users/getUserInfo', myId);
      if (myUser.company) {
        await this.$store.dispatch('users/getPartnerCompanyProperties');
        const companyInfo = await this.$store.dispatch('users/getCompanyInfo', myUser.company);
        if (companyInfo.authorisedId) {
          await this.$store.dispatch('users/getAuthorisedPersonInfo', companyInfo.authorisedId);
        }
      }
    },
    destroyed() {
      this.$store.commit('users/setUserData', null);
      this.$store.commit('users/setCompanyData', null);
      this.$store.commit('users/setPartnerCompanyProperties', {});
    },
  };
</script>

<style lang="scss" scoped>

</style>