<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ title }}</v-toolbar>
      <v-form ref="partnerFullForm" lazy-validation>
        <v-card class="partner-form">
          <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class="{ 'px-0': $vuetify.breakpoint.xs }"
              >
                <!-- User details -->
                <user-details
                  ref="userDetails"
                  :companies="companies"
                  :userRoles="partnerRoles"
                  :userData="userData"
                  @getUserDetails="getUserDetails"
                />

                <!-- Company details -->
                <company-details
                  ref="companyDetails"
                  :countries="countries"
                  :areasOfWork="areasOfWork"
                  :ownership="ownership"
                  :partnerTypes="partnerTypes"
                  :csoTypes="csoTypes"
                  :companyData="companyData"
                  @getCompanyDetails="getCompanyDetails"
                />

                <!-- Company documents -->
                <company-documents
                  ref="companyDocuments"
                  :companyDocumentsData="companyDocumentsData"
                  @getCompanyDocuments="getCompanyDocuments"
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
                <v-btn type="button" @click="createPartner" class="info mb-2 mt-2 mx-2" depressed>{{ $t('common.btns.save') }}</v-btn>
                <v-btn type="button" v-if="userData.status === 'active'" @click="blockUser" class="error mb-2 mt-2 mx-2" depressed>{{ $t('common.btns.block') }}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
      <block-user-dialog />
    </v-flex>
  </v-layout>
</template>

<script>
  import UserDetails from '@/shared/components/UserDetails';
  import CompanyDetails from '@/shared/components/CompanyDetails';
  import CompanyDocuments from '@/shared/components/CompanyDocuments';
  import BlockUserDialog from './BlockUserDialog';

  export default {
    name: 'PartnerFullForm',
    components: {
      UserDetails,
      CompanyDetails,
      CompanyDocuments,
      BlockUserDialog,
    },
    data() {
      return {
        credentials: {
          user: null,
          company: null,
          documents: null,
        },
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
      title() {
        return this.$route.path.indexOf('partner-create') !== -1 ? this.$t('createPartner.title') : this.$t('editPartner.title');
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
        return this.$store.getters['users/getPartnerCompanyProperties'].ownerships;
      },
      partnerTypes() {
        return this.$store.getters['users/getPartnerCompanyProperties'].partnerTypes;
      },
      csoTypes() {
        return this.$store.getters['users/getPartnerCompanyProperties'].csoTypes;
      },
      isAdminPath() {
        return this.$route.path.indexOf('admin') !== -1;
      },
      isPartnerPath() {
        return this.$route.path.indexOf('partner') !== -1;
      },
      isPartnerCreationPath() {
        return this.$route.path.indexOf('partner-create') !== -1;
      },
      userName() {
        const lang = this.$i18n.locale[0].toUpperCase() + this.$i18n.locale.slice(1);
        const firstName = `firstName${lang}`;
        const lastName = `lastName${lang}`;
        return `${this.userData[firstName]} ${this.userData[lastName]}`;
      },
    },
    async created() {
      await this.$store.dispatch('users/getPartnerCompanyProperties');
      if (this.$route.params.id) {
        const user = await this.$store.dispatch('users/getUserInfo', this.$route.params.id);
        if (user.company) {
          await this.$store.dispatch('users/getCompanyInfo', user.company);
          await this.$store.dispatch('users/getCompanyDocuments', user.company);
        }
      }
    },
    destroyed() {
      this.$store.commit('users/setUserData', null);
      this.$store.commit('users/setCompanyData', null);
      this.$store.commit('users/setCompanyDocumentsData', []);
      this.$store.commit('users/setPartnerCompanyProperties', {});
      this.$store.commit('users/toggleCompanyFieldsDisabled', false);
    },
    methods: {
      async createPartner() {
        if (this.$refs.partnerFullForm.validate() && this.$refs.companyDocuments.getCompanyDocuments()) {
          this.$refs.userDetails.getUserDetails();
          this.$refs.companyDetails.getCompanyDetails();
          this.$refs.companyDocuments.getCompanyDocuments();

          let response;
          if (this.isPartnerCreationPath) {
            response = await this.$store.dispatch('users/createPartnerByAdmin', this.credentials);
          } else {
            response = await this.$store.dispatch('users/editPartnerByAdmin', this.credentials);
          }

          if (response.data.success) {
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.$router.push({ name: 'partners-list' });
            }, 2000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
      getUserDetails(userData) {
        console.log('in parent user data: ', userData);
        this.credentials.user = userData;
      },
      getCompanyDetails(companyData) {
        console.log('in parent company data: ', companyData);
        this.credentials.company = companyData.company;
      },
      getCompanyDocuments(companyDocumetsData) {
        console.log('in parent company docs: ', companyDocumetsData);
        this.credentials.documents = companyDocumetsData;
      },
      blockUser() {
        this.$store.commit('admin/users/setBlockedUser', { user: { id: this.userData.id, name: this.userName }, type: 'partner' });
        this.$store.commit('admin/users/toggleBlockUserDialogState', true);
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
.btns-wrapper {
  @media (max-width: 550px) {
    flex-direction: column;
  }
}
</style>