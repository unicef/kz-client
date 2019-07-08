<template>
  <v-layout wrap class="container">
    <projects-navigation />
    <router-view/>
  </v-layout>
</template>

<script>
import ProjectsNavigation from '../components/projects/ProjectsNavigation';

export default {
    name: 'ProjectsPage',
    components: {
        ProjectsNavigation,
    },
};
</script>

<style lang="scss" scoped>

</style>