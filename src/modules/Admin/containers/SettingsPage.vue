<template>
  <v-layout wrap class="container">
    <settings-navigation />
    <router-view/>
  </v-layout>
</template>

<script>
import SettingsNavigation from '../components/settings/SettingsNavigation';

export default {
    name: 'SettingsPage',
    components: {
        SettingsNavigation,
    },
};
</script>

<style lang="scss" scoped>

</style>