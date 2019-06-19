<template>
	<div class="navigation users">
      <v-list class="users-nav-list">
        <v-list-tile to="/admin/users/unicef-users-list" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">{{ $t('header.navigation.unicef') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/admin/users/partners-list" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">{{ $t('header.navigation.partners') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/admin/users/donors-list" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">{{ $t('header.navigation.donors') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
</template>

<script>
  export default {
    name: 'UsersNavigation',
  };
</script>

<style lang="scss" scoped>
.navigation {
    &.users {
        width: 100%;
        background: transparent;

        .users-nav-list {
            display: flex;
            background: transparent;
        }
    }
}
</style>