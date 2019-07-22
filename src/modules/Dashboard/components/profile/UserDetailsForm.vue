<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">{{ $t('userDetails.title') }}</v-toolbar>
      <v-form ref="userDetailsForm" lazy-validation>
        <v-card class="user-details">
          <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class='{ "px-0": $vuetify.breakpoint.xs }'
              >
                <!-- User details -->
                <user-details ref="userDetails" :userData="userData" @getUserDetails="getUserDetails" />
                

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
                <v-btn type="button" @click="saveUser" :disabled="areBtnsDisabled" color="info mb-2 mt-2" depressed>{{ $t('common.btns.save') }}</v-btn>
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
  import UserDetails from '@/shared/components/UserDetails';

  export default {
    name: 'UserDetailsForm',
    components: {
      UserDetails,
    },
    async beforeRouteEnter(to, from, next) {
      if (!store.getters['dashboard/profile/showForm']) {
        next();
      } else {
        next('/dashboard/profile/user-form');
      }
    },
    async created() {
      const myId = JSON.parse(localStorage.getItem('me')).id;
      const myUser = await this.$store.dispatch('users/getUserInfo', myId);
      if (myUser.company) {
        await this.$store.dispatch('users/getPartnerCompanyProperties');
        await this.$store.dispatch('users/getCompanyDocuments', myUser.company);
        const companyInfo = await this.$store.dispatch('users/getCompanyInfo', myUser.company);
        if (companyInfo.authorisedId) {
          await this.$store.dispatch('users/getAuthorisedPersonInfo', companyInfo.authorisedId);
        }
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
        areBtnsDisabled: false,
      };
    },
    computed: {
      userData() {
        return this.$store.getters['users/getUserData'];
      },
      userDetailsForm() {
        return this.$store.getters['dashboard/profile/showForm'];
      },
    },
    methods: {
      async saveUser() {
        if (this.$refs.userDetailsForm.validate()) {
          this.$refs.userDetails.getUserDetails();

          this.areBtnsDisabled = true;
          const response = await this.$store.dispatch('users/saveUserDetails', this.credentials);

          if (response.data.success) {
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;
            this.$store.commit('users/setUserData', this.credentials);

            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.areBtnsDisabled = false;
            }, 2000);
          } else {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.errorAlert.msg = response.data.error.message;
          }
        }
      },
      getUserDetails(userData) {
        this.credentials = userData;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>