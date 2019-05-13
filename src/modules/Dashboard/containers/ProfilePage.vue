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
  };
</script>

<style lang="scss" scoped>

</style>