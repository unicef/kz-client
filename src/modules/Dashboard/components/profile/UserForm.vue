<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">User Profile</v-toolbar>
      <v-card class="user-step-by-step">
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <v-card-text>
            <v-container grid-list-md class="px-0 pb-0" :class="{ 'px-0': $vuetify.breakpoint.xs }">
              <!-- User details -->
              <v-form ref="userDetailsForm" v-show="step===1" lazy-validation>
                <user-details
                  ref="userDetails"
                  :companies="companies"
                  :partnerRoles="partnerRoles"
                  :userData="userData"
                  @getUserDetails="getUserDetails"
                />
              </v-form>

              <!-- Company details -->
              <v-form ref="companyDetailsForm" v-show="step===2"  v-if="isPartner" lazy-validation>
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
              </v-form>

              <!-- Company documents -->
              <v-form ref="companyDocumentsForm" v-show="step===3" v-if="isPartner" lazy-validation>
                <company-documents
                  ref="companyDocuments"
                  :companyDocumentsData="companyDocumentsData"
                  @getCompanyDocuments="getCompanyDocuments"
                />
              </v-form>

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
              <v-btn
                type="button"
                @click="step--"
                v-if="step > 1"
                color="error mb-2 mt-2"
                depressed
              >Back</v-btn>
              <v-btn
                type="button"
                @click="submitForm"
                v-if="!isPartner || (isPartner && (step === 3))"
                color="info mb-2 mt-2"
                depressed
              >Save</v-btn>
              <v-btn
                type="button"
                @click="submitForm"
                v-if="(step < 3) && isPartner"
                color="info mb-2 mt-2"
                depressed
              >Next</v-btn>
            </v-layout>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import UserDetails from '@/shared/components/UserDetails';
  import CompanyDetails from '@/shared/components/CompanyDetails';
  import CompanyDocuments from '@/shared/components/CompanyDocuments';

  export default {
    name: 'UserForm',
    components: {
      UserDetails,
      CompanyDetails,
      CompanyDocuments,
    },
    async beforeRouteEnter(to, from, next) {
      if (store.getters['auth/auth/showForm']) {
        next();
      } else {
        next('/dashboard/profile');
      }
    },
    data() {
      return {
        step: 1,
        credentials: {},
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
      companyDocumentsData() {
        return this.$store.getters['users/getCompanyDocumentsData'];
      },
      authorisedPersonData() {
        return this.$store.getters['users/getAuthorisedPersonData'];
      },
      title() {
        return this.$route.path.indexOf('partner-create') !== -1 ? 'Create Partner' : 'Edit Partner';
      },
      partnerRoles() {
        return this.$store.getters['users/getPartnerCompanyProperties'].roles;
      },
      companies() {
        return this.$store.getters['users/getPartnerCompanyProperties'].companies;
      },
      countries() {
        return this.$store.getters['users/getPartnerCompanyProperties'].countries;
      },
      areasOfWork() {
        return this.$store.getters['users/getPartnerCompanyProperties'].areasOfWork;
      },
      ownership() {
        return this.$store.getters['users/getPartnerCompanyProperties'].ownership;
      },
      partnerTypes() {
        return this.$store.getters['users/getPartnerCompanyProperties'].partnerTypes;
      },
      csoTypes() {
        return this.$store.getters['users/getPartnerCompanyProperties'].csoTypes;
      },
      isPartner() {
        return this.$store.getters['global/getRoles'].includes('ra') || this.$store.getters['global/getRoles'].includes('ap');
      },
    },
    created() {
    },
    destroyed() {
      this.$store.commit('users/setUserData', null);
      this.$store.commit('users/setCompanyData', null);
      this.$store.commit('users/setCompanyDocumentsData', []);
      this.$store.commit('users/setPartnerCompanyProperties', {});
      this.$store.commit('users/toggleCompanyFieldsDisabled', false);
    },
    methods: {
      saveProfile() {
        console.log('save profile', this.credentials);
      },
      submitForm() {
          switch (this.step) {
          case 1:
            if (this.$refs.userDetailsForm.validate()) {
              this.$refs.userDetails.getUserDetails();
              if (this.isPartner) {
                this.step++;
              } else {
                this.saveProfile();
              }
            }
            break;
          case 2:
            if (this.$refs.companyDetailsForm.validate()) {
              this.$refs.companyDetails.getCompanyDetails();
              this.step++;
            }
            break;
          case 3:
            if (this.$refs.companyDocumentsForm.validate() && this.$refs.companyDocuments.getCompanyDocuments()) {
              this.$refs.companyDocuments.getCompanyDocuments();
              this.saveProfile();
            }
            break;
          default:
            break;
        }
      },
      getUserDetails(userData) {
        console.log('in parent user data: ', userData);
        this.credentials.user = userData;
      },
      getCompanyDetails(companyData) {
        console.log('in parent company data: ', companyData);
        this.credentials.company = companyData;
      },
      getCompanyDocuments(companyDocumetsData) {
        console.log('in parent company docs: ', companyDocumetsData);
        this.credentials.documents = companyDocumetsData;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>