<template>
  <v-layout wrap>
    <v-flex xs12>
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
  export default {
    name: 'UserSettings',
    components: {
    },
  };
</script>

<style lang="scss" scoped>
</style>