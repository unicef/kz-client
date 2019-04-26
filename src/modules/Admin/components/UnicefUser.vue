<template>
  <v-layout row class="container">
    <v-flex sm4 offset-sm1 xs12>
      <h1 class="ui_title">Details of Alexander Ivanov</h1>
      <v-form>
        <v-text-field label="Email" required></v-text-field>
        <v-text-field label="Name" required></v-text-field>
        <v-text-field label="Last Name" required></v-text-field>
        <v-select :items="jobs" label="Occupation/Job title" required></v-select>
        <v-text-field label="Telephone number" required></v-text-field>
        <v-text-field label="Mobile number" required></v-text-field>
        <v-select :items="roles" label="Role" required></v-select>
        <v-text-field label="Password" required></v-text-field>

        <v-layout>
          <v-btn color="error">Block</v-btn>
          <v-btn color="primary">Save</v-btn>
          <v-btn color="primary">Cancel</v-btn>
        </v-layout>
      </v-form>
    </v-flex>
    <v-flex sm4 offset-sm1 xs12>
      <v-card>
        <v-list two-line>
          <template>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>System ID</v-list-tile-title>
                <v-list-tile-sub-title>{{id}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Registration date</v-list-tile-title>
                <v-list-tile-sub-title>20-Jan-2019</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Last login</v-list-tile-title>
                <v-list-tile-sub-title>12-Feb- 2019 13:56:09</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Status</v-list-tile-title>
                <v-list-tile-sub-title>Active</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                jobs: ['Architect', 'Brick Mason', 'Construction Laborer', 'Electrician', 'Environmental Engineer', 'Glazier'],
                roles: ['Admin', 'user'],
            };
        },
    };
</script>

<style lang="scss" scoped="true">
.v-card {
  margin-top: 90px;
  .v-list {
    padding: 0;
  }
}
</style>