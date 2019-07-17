<template>
	<div class="navigation partner">
      <v-list class="partner-nav-list">
        <v-list-tile :to="`/dashboard/partners/${$route.params.partnerId}/company-users`" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">{{ $t('header.navigation.companyUsers') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="`/dashboard/partners/${$route.params.partnerId}/company-info`" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">{{ $t('header.navigation.companyInfo') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="`/dashboard/partners/${$route.params.partnerId}/company-documents`" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">{{ $t('header.navigation.companyDocumets') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="`/dashboard/partners/${$route.params.partnerId}/company-projects`" active-class="active">
          <v-list-tile-content>
            <v-layout row align-center>
              <div class="navigation-name">{{ $t('header.navigation.companyProjects') }}</div>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
</template>

<script>
  export default {
    name: 'PartnerNavigation',
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
    &.partner {
        width: 100%;
        background: transparent;

        .partner-nav-list {
            display: flex;
            background: transparent;

            @media (max-width: (450px)) {
              display: block;
            }
        }
    }
}
</style>