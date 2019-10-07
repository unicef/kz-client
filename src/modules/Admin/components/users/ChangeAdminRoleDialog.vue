<template>
  <v-layout row justify-center>
    <v-dialog
      transition="slide-y-transition"
      v-model="changeAdminRoleDialog"
      @keydown.esc="close"
      persistent
      max-width="550"
    >
      <v-card class="change-admin-role-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('changeAdminRoleDialog.title') }}: {{userName}}?</v-card-title>
        <!-- Alert -->
        <v-layout row v-if="errorAlert.state">
          <v-flex sm12 py-2>
            <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
          </v-flex>
        </v-layout>
        <!-- Success -->
        <v-layout row v-if="successAlert.state">
          <v-flex sm12 py-2>
            <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            flat
            :disabled="areBtnsDisabled"
            @click="close"
          >{{ $t('common.btns.cancel') }}</v-btn>
          <v-btn
            color="green darken-1"
            flat
            :disabled="areBtnsDisabled"
            @click="changeAdminRole"
          >{{ userData.isAdmin ? $t('common.btns.unmakeAdmin') : $t('common.btns.makeAdmin') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'ChangeAdminRoleDialog',
    data() {
      return {
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
      changeAdminRoleDialog: {
        get() {
          return this.$store.getters['admin/users/getChangeAdminRoleDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      userData() {
        return this.$store.getters['users/getUserData'];
      },
      userName() {
        const lang = this.$i18n.locale[0].toUpperCase() + this.$i18n.locale.slice(1);
        const firstName = `firstName${lang}`;
        const lastName = `lastName${lang}`;
        return `${this.userData[firstName]} ${this.userData[lastName]}`;
      },
    },
    methods: {
      async changeAdminRole() {
        this.areBtnsDisabled = true;
        const data = await this.$store.dispatch('admin/users/changeAdminRole', { isAdmin: this.userData.isAdmin, user: { userId: this.userData.id } });

        if (data.data.success) {
          this.errorAlert.state = false;
          this.errorAlert.msg = '';
          this.successAlert.state = true;
          this.successAlert.msg = data.data.data.message;

          setTimeout(() => {
            this.successAlert.state = false;
            this.areBtnsDisabled = false;
            this.successAlert.msg = '';
            this.close();
            this.$router.push({ name: 'unicef-users-list' });
          }, 3000);
        } else {
          this.errorAlert.state = true;
          this.areBtnsDisabled = false;
          this.errorAlert.msg = data.data.error.message;
        }
      },
      close() {
        this.$store.commit('admin/users/toggleChangeAdminRoleDialogState', false);
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
.change-admin-role-dialog {
  .v-btn {
    text-transform: initial;
  }
}
</style>