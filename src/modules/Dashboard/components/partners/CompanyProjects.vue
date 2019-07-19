<template>
  <v-layout wrap container px-0 py-0>
    <v-flex xs12 mt-4>
      <v-toolbar
        class="headline justify-center"
        color="light-blue"
      >{{ $t('companyProjects.title') }}</v-toolbar>
      <v-card>
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-text>
          </v-card-text>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'CompanyProjects',
    components: {
    },
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
</style>