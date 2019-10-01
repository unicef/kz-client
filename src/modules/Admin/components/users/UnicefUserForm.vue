<template>
  <v-layout wrap>
    <v-flex xs12 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">{{ title }}</v-toolbar>
      <v-form ref="unicefUserForm" lazy-validation>
        <v-card class="unicef-user-form">
          <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
            <v-card-text>
              <v-container
                grid-list-md
                class="px-0 pb-0"
                :class="{ 'px-0': $vuetify.breakpoint.xs }"
              >
                <!-- Dublicate Btn -->
                <v-layout wrap justify-end v-if="isDataLoaded && !isUserBlocked">
                  <v-btn type="button" @click="dublicateFields" :disabled="areBtnsDisabled" class="info mb-2 mt-2 mx-2" depressed>{{ $t('common.btns.dublicate') }} {{ dublicateBtnLanguage }}</v-btn>
                </v-layout>
                <!-- User details -->
                <user-details
                  ref="userDetails"
                  :userRoles="unicefRoles"
                  :userData="userData"
                  @getUserDetails="getUserDetails"
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
                <v-btn type="button" @click="saveUnicefUser" v-if="!isUserBlocked" :disabled="areBtnsDisabled" class="info mb-2 mt-2 mx-2" depressed>{{ $t('common.btns.save') }}</v-btn>
                <v-btn type="button" v-if="userData.status === 'active'" @click="blockUser" :disabled="areBtnsDisabled" class="error mb-2 mt-2 mx-2" depressed>{{ $t('common.btns.block') }}</v-btn>
              </v-layout>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-form>
    </v-flex>
    <block-user-dialog />
  </v-layout>
</template>

<script>
  import UserDetails from '@/shared/components/UserDetails';
  import BlockUserDialog from './BlockUserDialog';

  export default {
    name: 'UnicefUserForm',
    components: {
      UserDetails,
      BlockUserDialog,
    },
    data() {
      return {
        credentials: {
          user: null,
        },
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
        areBtnsDisabled: false,
        isDataLoaded: false,
      };
    },
    computed: {
      userData() {
        return this.$store.getters['users/getUserData'];
      },
      title() {
        return this.$route.path.indexOf('unicef-user-create') !== -1 ? this.$t('createUnicefUser.title') : this.$t('editUnicefUser.title');
      },
      unicefRoles() {
        return this.$store.getters['admin/users/getUnicefUserProperties'].roles;
      },
      isAdminPath() {
        return this.$route.path.indexOf('admin') !== -1;
      },
      isUnicefUserPath() {
        return this.$route.path.indexOf('unicef-user') !== -1;
      },
      isUnicefUserCreationPath() {
        return this.$route.path.indexOf('unicef-user-create') !== -1;
      },
      userName() {
        const lang = this.$i18n.locale[0].toUpperCase() + this.$i18n.locale.slice(1);
        const firstName = `firstName${lang}`;
        const lastName = `lastName${lang}`;
        return `${this.userData[firstName]} ${this.userData[lastName]}`;
      },
      isUserBlocked() {
        return this.userData.status === 'blocked';
      },
      dublicateBtnLanguage() {
        return (this.$i18n.locale === 'en') ? 'Ru' : 'En';
      },
    },
    watch: {
      /* eslint-disable */
      '$i18n.locale': async function() {
        await this.$store.dispatch('admin/users/getUnicefUserProperties');
      },
    },
    async created() {
      await this.$store.dispatch('admin/users/getUnicefUserProperties');
      if (this.$route.params.id) {
        const { data } = await this.$store.dispatch('users/getUserInfo', this.$route.params.id);

        if (data && !data.success) {
          return this.$router.push({ name: 'not-found' });
        }
        this.isDataLoaded = true;
      } else {
        this.isDataLoaded = true;
      }
    },
    destroyed() {
      this.$store.commit('users/setUserData', null);
      this.$store.commit('admin/users/setUnicefUserProperties', {});
    },
    methods: {
      async saveUnicefUser() {
        if (this.$refs.unicefUserForm.validate()) {
          this.$refs.userDetails.getUserDetails();

          this.areBtnsDisabled = true;
          let response;
          if (this.isUnicefUserCreationPath) {
            response = await this.$store.dispatch('admin/users/createUnicefUserByAdmin', this.credentials);
          } else {
            response = await this.$store.dispatch('admin/users/editUnicefUserByAdmin', this.credentials);
          }

          if (response.data.success) {
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = response.data.data.message;

            setTimeout(() => {
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.areBtnsDisabled = false;
              this.$router.push({ name: 'unicef-users-list' });
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
        this.credentials.user = userData;
      },
      blockUser() {
        this.$store.commit('admin/users/setBlockedUser', { user: { id: this.userData.id, name: this.userName }, type: 'unicef' });
        this.$store.commit('admin/users/toggleBlockUserDialogState', true);
      },
      dublicateFields() {
        this.$refs.userDetails.dublicateUserDetailsFields();
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