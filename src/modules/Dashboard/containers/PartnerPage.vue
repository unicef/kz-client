<template>
  <v-layout wrap class="container pt-0">
    <partner-navigation />
    <router-view/>
  </v-layout>
</template>

<script>
import PartnerNavigation from '../components/partners/PartnerNavigation';

export default {
    name: 'PartnerPage',
    components: {
        PartnerNavigation,
    },
};
</script>

<style lang="scss" scoped>

</style>