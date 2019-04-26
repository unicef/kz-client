<template>
  <v-app>
    <router-view />
  </v-app>
</template>
<script>
    export default {
        name: 'app',
        created() {
          this.$store.dispatch('global/fetchLanguagesData');
        },
    };
</script>
<style lang="scss">
  @import 'vuetify/dist/vuetify.min.css';
  @import '~@/assets/styles/index';
  #app {
    font-family: 'San Francisco', 'Roboto', 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>