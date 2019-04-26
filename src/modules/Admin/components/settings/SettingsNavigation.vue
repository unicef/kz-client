<template>
	<div class="navigation settings" v-if='$vuetify.breakpoint.mdAndUp'>
      <v-list class="settings-nav-list">
        <v-list-tile to="/admin/settings/change-password" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">Password settings</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/admin/settings/localization" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">Localization</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
</template>

<script>
  export default {
    name: 'SettingsNavigation',
  };
</script>

<style lang="scss" scoped>
.navigation {
    &.settings {
        width: 100%;
        background: transparent;

        .settings-nav-list {
            display: flex;
            background: transparent;
        }
    }
}
</style>