<template>
	<div class="navigation profile">
      <v-list class="profile-nav-list">
        <v-list-tile to="/dashboard/profile/user-details" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">User Details</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/dashboard/profile/company-details" v-if="isPartner" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">Company details</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/dashboard/profile/documents" v-if="isPartner" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">Docs</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/dashboard/profile/settings" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">Settings</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
</template>

<script>
  export default {
    name: 'ProfileNavigation',
    computed: {
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isPartner() {
        return this.roles.indexOf('ra') !== -1 || this.roles.indexOf('ap') !== -1;
      },
    },
  };
</script>

<style lang="scss" scoped>
.navigation {
    &.profile {
        width: 100%;
        background: transparent;

        .profile-nav-list {
            display: flex;
            background: transparent;
        }
    }
}
</style>