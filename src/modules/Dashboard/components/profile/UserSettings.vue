<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">User Settings</v-toolbar>
      <v-card class="user-settings">
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-title class="headline">User Settings</v-card-title>

          <v-card-text></v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';

  export default {
    name: 'UserSettings',
    components: {
    },
    async beforeRouteEnter(to, from, next) {
      if (!store.getters['dashboard/profile/showForm']) {
        next();
      } else {
        next('/dashboard/profile/user-form');
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>