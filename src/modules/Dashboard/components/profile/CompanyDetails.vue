<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card class="company-details">
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-title class="headline">Company Details</v-card-title>

          <v-card-text></v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';

  export default {
    name: 'CompanyDetails',
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