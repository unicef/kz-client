<template>
	<div class="navigation projects">
      <v-list class="projects-nav-list">
        <v-list-tile v-if="!isDonor" to="/dashboard/projects/my-projects" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">{{ $t('header.navigation.myProjects') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isUnicefUser || isDonor" to="/dashboard/projects/all-projects" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">{{ $t('header.navigation.allProjects') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isUnicefUser" to="/dashboard/projects/create-project" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <!-- Name -->
              <div class="navigation-name">{{ $t('header.navigation.createProject') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
</template>

<script>
  export default {
    name: 'ProjectsNavigation',
    computed: {
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isUnicefUser() {
        return this.roles.indexOf('ro') !== -1 || this.roles.indexOf('bo') !== -1 || this.roles.indexOf('dr') !== -1 || this.roles.indexOf('om') !== -1;
      },
      isDonor() {
        return this.roles.indexOf('d') !== -1;
      },
    },
  };
</script>

<style lang="scss" scoped>
.navigation {
    &.projects {
        width: 100%;
        background: transparent;

        .projects-nav-list {
            display: flex;
            background: transparent;

            @media (max-width: (550px)) {
              display: block;
            }
        }
    }
}
</style>