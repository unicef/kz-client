<template>
  <v-layout wrap container px-0 py-0>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ $t('companyUsers.title') }}</v-toolbar>
      <v-card class="company-users">
          <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
            <v-card-text>
              <v-layout wrap mb-4>
                <v-flex xs12 pb-2>
                  <h2 class="title mb-2 font-weight-bold">{{ companyData.name }}</h2>
                </v-flex>
                <partner-status />
                <!-- RESPONSIBLE ASSISTANT BLOCK -->
                <v-flex xs12 pt-4 v-if="companyData.assistant">
                  <h3 class="title mb-2">{{ $t('companyUsers.assistant') }}</h3>
                </v-flex>
                <v-flex xs12 pt-4 v-if="!companyData.assistant.id">
                  <p class=".subheading mb-2">{{ $t('common.fields.noDataYet') }}</p>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pr-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.assistant.createdAt">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.registrationDate') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.createdAt }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.assistant.email">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.email') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.email }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.assistant.firstName">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.firstName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.firstName }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.assistant.lastName">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.lastName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.lastName }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pl-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.assistant.status">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.status') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.status }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.assistant.occupation">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.occupation') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.occupation }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.assistant.tel">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.telephone') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.tel }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.assistant.mobile">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.mobile') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.assistant.mobile }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <!-- AUTHORISED PERSON BLOCK -->
                <v-flex xs12 pt-4 v-if="companyData.authorised">
                  <h3 class="title mb-2">{{ $t('companyUsers.authorised') }}</h3>
                </v-flex>
                <v-flex xs12 pt-4 v-if="!companyData.authorised.id">
                  <p class=".subheading mb-2">{{ $t('common.fields.noDataYet') }}</p>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pr-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.authorised.createdAt">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.registrationDate') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.createdAt }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.authorised.email">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.email') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.email }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.authorised.firstName">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.firstName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.firstName }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.authorised.lastName">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.lastName') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.lastName }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex xs12 md6 :class="{ 'pl-4': $vuetify.breakpoint.mdAndUp }">
                  <v-list dense>
                    <v-list-tile v-if="companyData.authorised.status">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.status') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.status }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.authorised.occupation">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.occupation') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.occupation }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.authorised.tel">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.telephone') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.tel }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-if="companyData.authorised.mobile">
                      <v-list-tile-content class="font-weight-bold">{{ $t('common.fields.mobile') }}:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ companyData.authorised.mobile }}</v-list-tile-content>
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
    name: 'CompanyUsers',
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