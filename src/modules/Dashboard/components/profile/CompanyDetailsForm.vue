<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">{{ $t('companyDetails.title') }}</v-toolbar>
      <v-form ref="companyDetailsForm" lazy-validation>
        <v-card class="company-details">
          <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class='{ "px-0": $vuetify.breakpoint.xs }'
              >
                <!-- Company details -->
                <company-details
                  ref="companyDetails"
                  :countries="countries"
                  :areasOfWork="areasOfWork"
                  :ownership="ownership"
                  :partnerTypes="partnerTypes"
                  :csoTypes="csoTypes"
                  :companyData="companyData"
                  :authorisedPersonData="authorisedPersonData"
                  @getCompanyDetails="getCompanyDetails"
                />
                

                <!-- Alert -->
                <v-layout row v-if="errorAlert.state">
                  <v-flex sm12>
                    <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
                <!-- Success -->
                <v-layout row v-if="successAlert.state">
                  <v-flex sm12>
                    <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-layout align-center class="btns-wrapper">
                <v-btn type="button" @click="saveCompany" color="info mb-2 mt-2" depressed>{{ $t('common.btns.save') }}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import CompanyDetails from '@/shared/components/CompanyDetails';

  export default {
    name: 'CompanyDetailsForm',
    components: {
      CompanyDetails,
    },
    beforeRouteEnter(to, from, next) {
      if ((store.getters['global/getRoles'].indexOf('ra') !== -1 && !store.getters['dashboard/profile/showForm']) || (store.getters['global/getRoles'].indexOf('ap') !== -1 && !store.getters['dashboard/profile/showForm'])) {
        next();
      } else if ((store.getters['global/getRoles'].indexOf('ra') !== -1 && store.getters['dashboard/profile/showForm']) || (store.getters['global/getRoles'].indexOf('ap') !== -1 && store.getters['dashboard/profile/showForm'])) {
        next('/dashboard/profile/user-form');
      } else {
        next('/dashboard/profile');
      }
    },
    data() {
      return {
        credentials: null,
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
      };
    },
    computed: {
      userData() {
        return this.$store.getters['users/getUserData'];
      },
      companyData() {
        return this.$store.getters['users/getCompanyData'];
      },
      authorisedPersonData() {
        return this.$store.getters['users/getAuthorisedPersonData'];
      },
      countries() {
        return this.$store.getters['users/getPartnerCompanyProperties'].countries;
      },
      areasOfWork() {
        return this.$store.getters['users/getPartnerCompanyProperties'].areasOfWork;
      },
      ownership() {
        return this.$store.getters['users/getPartnerCompanyProperties'].ownerships;
      },
      partnerTypes() {
        return this.$store.getters['users/getPartnerCompanyProperties'].partnerTypes;
      },
      csoTypes() {
        return this.$store.getters['users/getPartnerCompanyProperties'].csoTypes;
      },
    },
    methods: {
      async saveCompany() {
        if (this.$refs.companyDetailsForm.validate()) {
          this.$refs.companyDetails.getCompanyDetails();

          const response = await this.$store.dispatch('users/saveCompanyDetails', this.credentials);

          if (response.data.success) {
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            this.$store.commit('users/setCompanyData', this.credentials.company);
            this.$store.commit('users/setAuthorisedPersonData', this.credentials.authorisedPerson);

            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
            }, 2000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
      getCompanyDetails(companyData) {
        console.log('dashbord in parent company data: ', companyData);
        this.credentials = companyData;
      },
    },

  };
</script>

<style lang="scss" scoped>
</style>