<template>
  <v-layout wrap>
    <v-flex xs12 mb-2 v-if="companyData.statusId">
      <v-layout align-center justify-end>
        <v-chip
          disabled
          :color="companyStatusChipColor"
          text-color="white"
        >{{ $t('companyInfo.status') }}: {{companyData.statusId.toUpperCase()}}</v-chip>
      </v-layout>
    </v-flex>
    <v-flex
      xs12
      mb-2
      v-if="companyData.statusId === 'filled'"
    >
      <v-layout align-center justify-end class="btns-wrapper">
        <v-btn
          type="button"
          @click="approvePartner"
          class="info mb-2 mt-2 mx-2"
          depressed
        >{{ $t('common.btns.approve') }}</v-btn>
        <v-btn
          type="button"
          @click="rejectPartner"
          class="error mb-2 mt-2 mx-2"
          depressed
        >{{ $t('common.btns.reject') }}</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { chipColor } from '@/shared/helpers/chipColor';

  export default {
    name: 'PartnerStatus',
    components: {
    },
    data() {
      return {
      };
    },
    computed: {
      companyData() {
        return this.$store.getters['dashboard/users/getPartnerInfo'];
      },
      companyStatusChipColor() {
        return chipColor(this.companyData.statusId);
      },
    },
    methods: {
      approvePartner() {
        this.$store.commit('users/setApprovedCompany', { id: this.companyData.id, name: this.companyData.name });
        this.$store.commit('users/toggleApproveCompanyDialogState', true);
      },
      rejectPartner() {
        this.$store.commit('users/setRejectedCompany', { id: this.companyData.id, name: this.companyData.name });
        this.$store.commit('users/toggleRejectCompanyDialogState', true);
      },
    },
  };
</script>

<style lang="scss" scoped>
.btns-wrapper {
  @media (max-width: 550px) {
    flex-direction: column;
  }
}
</style>