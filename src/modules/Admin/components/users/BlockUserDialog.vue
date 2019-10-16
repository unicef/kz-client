<template>
  <v-layout row justify-center>
    <v-dialog 
      transition="slide-y-transition"
      v-model='blockUserDialog' 
      @keydown.esc='close' 
      persistent 
      max-width="550">
      <v-card class="block-user-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('blockUserDialog.title1') }} {{blockedUser ? blockedUser.user.name : ''}}? {{ $t('blockUserDialog.title2') }}</v-card-title>
        <v-card-text>
            <v-form ref="blockUserForm" lazy-validation>
            <v-layout row>
                <v-flex sm12>
                    <v-text-field
                        name="Email"
                        :label='$t("common.fields.email") + "*"'
                        id="email"
                        v-model="email"
                        type="email"
                        :rules="rules.email"
                        required
                    />
                </v-flex>
            </v-layout>
            </v-form>
        </v-card-text>
        <!-- Alert -->
        <v-layout row v-if='errorAlert.state'>
            <v-flex sm12 py-2>
              <v-alert :value="errorAlert.state" type="error">
                {{ errorAlert.msg }}
            </v-alert>
            </v-flex>
        </v-layout>
        <!-- Success -->
        <v-layout row v-if="successAlert.state">
            <v-flex sm12 py-2>
            <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
            </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn color="red darken-1" flat :disabled="areBtnsDisabled" @click="close">{{ $t('common.btns.cancel') }}</v-btn>
          <v-btn color="green darken-1" flat :disabled="areBtnsDisabled" @click="blockUser">{{ $t('common.btns.block') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'BlockUserDialog',
    data() {
      return {
        email: '',
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
        areBtnsDisabled: false,
        rules: {
          email: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
            v => /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/.test(v) || this.$t('common.fields.validation.email'),
          ],
        },
      };
    },
    computed: {
      blockUserDialog: {
        get() {
          return this.$store.getters['admin/users/getBlockUserDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      blockedUser() {
        return this.$store.getters['admin/users/getBlockedUser'];
      },
    },
    methods: {
      async blockUser() {
        if (this.$refs.blockUserForm.validate()) {
          this.areBtnsDisabled = true;
          const data = await this.$store.dispatch('admin/users/blockUser', { type: this.blockedUser.type, user: { userId: this.blockedUser.user.id, email: this.email } });

          if (data.data.success) {
            this.$refs.blockUserForm.reset();
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = data.data.data.message;

            setTimeout(() => {
              const routeName = this.blockUser.type === 'unicef' ? 'unicef-users-list' : 'partners-list';
              this.successAlert.state = false;
              this.areBtnsDisabled = false;
              this.successAlert.msg = '';
              this.close();
              this.$router.push({ name: routeName });
            }, 3000);
          } else {
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.errorAlert.msg = data.data.error.message;
          }
        }
      },
      close() {
        this.$refs.blockUserForm.reset();
        this.$store.commit('admin/users/toggleBlockUserDialogState', false);
        this.$store.commit('admin/users/setBlockedUser', null);
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .block-user-dialog {
    .v-btn {
      text-transform: initial;
    }
  }
</style>