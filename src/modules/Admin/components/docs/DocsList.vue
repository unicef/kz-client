<template>
  <v-layout wrap>
    <!-- Content -->
    <v-flex>
      <h1>List of pages</h1>
      <v-spacer />
      <v-btn :to="{ name: 'create-page' }">
        Create page
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'DocsList',
    data() {
      return {
      };
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }
</style>
