<template>
  <v-layout wrap container px-0 py-0>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('companyInfo.title') }}</v-toolbar>
      <v-card class="company-info">
          <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
            <v-card-text>
              <v-layout wrap mb-4>
                <v-flex xs12 pb-2>
                  <h2 class="title mb-2 font-weight-bold">{{ companyData.name }}</h2>
                </v-flex>
                <partner-status />
                <!-- COMPANY GENERAL INFO -->
                <v-flex xs12 pt-4>
                  <h3 class="title mb-2">{{ $t('companyInfo.title') }}</h3>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pr-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.name">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.companyName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.name }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.license">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.license') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.license }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.country">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.country') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.country }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.ceoFirstName">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.ceoFirstName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.ceoFirstName }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.ceoLastName">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.ceoLastName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.ceoLastName }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.tradeName">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.tradeName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.tradeName }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pl-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.establishmentYear">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.companyYear') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.establishmentYear }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.employersCount">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.employersCount') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.employersCount }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.areaOfWork">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.areaOfWork') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.areaOfWork }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.ownership">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.ownership') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.ownership }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.partnerType">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.partnerType') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.partnerType }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.csoType">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.csoType') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.csoType }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <!-- COMPANY CONTACTS INFO -->
                <v-flex xs12 pt-4>
                  <h3 class="title mb-2">{{ $t('companyContacts.title') }}</h3>
                </v-flex>
                <v-flex xs12 pt-4 v-if="!companyData.tel && !companyData.website && !companyData.city && !companyData.address && !companyData.zip">
                  <p class=".subheading mb-2">{{ $t('common.fields.noDataYet') }}</p>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pr-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.tel">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.telephone') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.tel }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.website">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.website') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.website }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.city">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.city') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.city }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pl-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.address">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.address') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.address }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.zip">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.zip') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.zip }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import PartnerStatus from './PartnerStatus';

  export default {
    name: 'CompanyInfo',
    components: {
      PartnerStatus,
    },
    data() {
      return {
      };
    },
    computed: {
      companyData() {
        return this.$store.getters['dashboard/users/getPartnerInfo'];
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>