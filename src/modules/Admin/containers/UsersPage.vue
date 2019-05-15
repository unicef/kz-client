<template>
  <v-layout wrap class="container">
    <users-navigation />
    <router-view/>
  </v-layout>
</template>

<script>
import UsersNavigation from '../components/users/UsersNavigation';

export default {
name: 'UsersPage',
components: {
    UsersNavigation,
},
};
</script>

<style lang="scss" scoped>

</style>