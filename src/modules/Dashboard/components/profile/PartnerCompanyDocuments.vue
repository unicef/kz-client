<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">Company Documents</v-toolbar>
      <v-card class="company-documents">
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-title class="headline">Company Documents</v-card-title>

          <v-card-text></v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';

  export default {
    name: 'PartnerCompanyDocuments',
    components: {
    },
    beforeRouteEnter(to, from, next) {
      if (store.getters['global/getRoles'].indexOf('ra') !== -1 || store.getters['global/getRoles'].indexOf('ap') !== -1) {
        next();
      } else {
        next('/dashboard/profile');
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>