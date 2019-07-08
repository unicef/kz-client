<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('myProjects.title') }}</v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'MyProjects',
    components: {
    },
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>