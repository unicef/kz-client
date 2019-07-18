<template>
  <v-layout row justify-center>
    <v-dialog 
      transition="slide-y-transition"
      v-model='blockDonorDialog' 
      @keydown.esc='close' 
      persistent 
      max-width="550">
      <v-card class="block-user-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('blockUserDialog.title1') }} {{blockedDonor ? blockedDonor.user.name : ''}}?</v-card-title>
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
          <v-btn color="green darken-1" flat :disabled="areBtnsDisabled" @click="blockDonor">{{ $t('common.btns.block') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'BlockDonorDialog',
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
      blockDonorDialog: {
        get() {
          return this.$store.getters['admin/users/getBlockDonorDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      blockedDonor() {
        return this.$store.getters['admin/users/getBlockedUser'];
      },
    },
    methods: {
      async blockDonor() {
        this.areBtnsDisabled = true;
        const data = await this.$store.dispatch('admin/users/blockDonor', { userId: this.blockedDonor.user.id });

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
            this.$router.push({ name: 'donors-list' });
          }, 3000);
        } else {
          this.errorAlert.state = true;
          this.areBtnsDisabled = false;
          this.errorAlert.msg = data.data.error.message;
        }
      },
      close() {
        this.$store.commit('admin/users/toggleBlockDonorDialogState', false);
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