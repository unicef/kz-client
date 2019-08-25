<template>
  <v-layout wrap class="container px-0 py-0">
    <partner-navigation />
    <router-view/>
    <reject-company-dialog />
    <approve-company-dialog />
  </v-layout>
</template>

<script>
import RejectCompanyDialog from '@/shared/components/RejectCompanyDialog';
import ApproveCompanyDialog from '@/shared/components/ApproveCompanyDialog';
import PartnerNavigation from '../components/partners/PartnerNavigation';

export default {
    name: 'PartnerPage',
    components: {
      PartnerNavigation,
      RejectCompanyDialog,
      ApproveCompanyDialog,
    },
    watch: {
      /* eslint-disable */
      '$i18n.locale': async function() {
        await this.$store.dispatch('dashboard/users/fetchPartnerInfoData', this.$route.params.partnerId);
      },
    },
    async created() {
      const partner = await this.$store.dispatch('dashboard/users/fetchPartnerInfoData', this.$route.params.partnerId);
      if (partner.success) {
        await this.$store.dispatch('users/getCompanyDocuments', this.$route.params.partnerId);
      } else {
        this.$router.push({name: 'not-found-page'});
      }
    },
    destroyed() {
      this.$store.commit('dashboard/users/setPartnerInfo', null);
      this.$store.commit('users/setCompanyDocumentsData', []);
    },
};
</script>

<style lang="scss" scoped>

</style>