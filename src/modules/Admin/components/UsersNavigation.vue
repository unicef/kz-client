<template>
	<div class="navigation users">
      <v-list class="users-nav-list">
        <v-list-tile to="/admin/users/unicef-users-list" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">UNICEF</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/admin/users/partners-list" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">Partners</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/admin/users/donors-list" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">Donors</div>
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