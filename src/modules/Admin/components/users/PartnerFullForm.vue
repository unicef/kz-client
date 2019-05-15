<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ title }}</v-toolbar>
      <v-form ref="partnerFullForm" lazy-validation>
        <v-card class="partner-form">
          <v-container :class='{ "pt-4": $vuetify.breakpoint.xs }'>
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class='{ "px-0": $vuetify.breakpoint.xs }'
              >
                <!-- User details -->
                <user-details ref="userDetails" :companies="companies" :partnerRoles="partnerRoles" :userData="userData" @getUserDetails="getUserDetails" />
                

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
                <v-btn type="button" @click="createPartner" color="info mb-2 mt-2" depressed>Create</v-btn>
                <v-btn type="button" color="error mb-2 mt-2" depressed>Cancel</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import UserDetails from '@/shared/components/UserDetails';

  export default {
    name: 'PartnerFullForm',
    components: {
      UserDetails,
    },
    data() {
      return {
        // userData: {
        //   email: 'testmytest25@test.test',
        //   roles: [
        //     {
        //       title: 'Responsible assistant',
        //       id: 0,
        //     },
        //     {
        //       title: 'Authorized person',
        //       id: 1,
        //     },
        //   ],
        //   selectedRole: {},
        // },
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
      title() {
        return this.$route.path.indexOf('partner-create') !== -1 ? 'Create Partner' : 'Edit Partner';
      },
      partnerRoles() {
        return this.$store.getters['users/getPartnerCompanyProperties'].roles;
      },
      companies() {
        return this.$store.getters['users/getPartnerCompanyProperties'].companies;
      },
    },
    async created() {
      await this.$store.dispatch('users/getPartnerCompanyProperties');
      if (this.$route.params.id) {
        await this.$store.dispatch('users/getUserInfo', this.$route.params.id);
      }
    },
    destroyed() {
      this.$store.commit('users/setUserData', { root: true }, {});
      this.$store.commit('users/setPartnerCompanyProperties', { root: true }, {});
    },
    methods: {
      async createPartner() {
          // console.log('create partner');
        if (this.$refs.partnerFullForm.validate()) {
          this.$refs.userDetails.getUserDetails();
        }
      },
      getUserDetails(userData) {
        console.log('in parent', userData);
      },
    },
  };
</script>

<style lang="scss" scoped>
.search {
  max-width: 250px;
}
</style>