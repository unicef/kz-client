<template>
  <v-layout row justify-center>
    <v-dialog 
      transition="slide-y-transition"
      v-model='approveCompanyDialog' 
      @keydown.esc='close' 
      persistent 
      max-width="550">
      <v-card class="approve-company-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('approveCompanyDialog.title1') }} {{approvedCompany ? approvedCompany.name : ''}}?</v-card-title>

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
          <v-btn color="green darken-1" flat :disabled="areBtnsDisabled" @click="approveCompany">{{ $t('common.btns.approve') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'ApproveCompanyDialog',
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
      approveCompanyDialog: {
        get() {
          return this.$store.getters['users/getApproveCompanyDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      approvedCompany() {
        return this.$store.getters['users/getApprovedCompany'];
      },
    },
    methods: {
      async approveCompany() {
        this.areBtnsDisabled = true;
        const data = await this.$store.dispatch('users/approveCompany', { id: this.approvedCompany.id });

        if (data.data.success) {
          this.errorAlert.state = false;
          this.errorAlert.msg = '';
          this.successAlert.state = true;
          this.successAlert.msg = data.data.data.message;

          setTimeout(() => {
            this.$store.commit('users/setCompanyDataField', { field: 'statusId', value: data.data.data.statusId });
            this.successAlert.state = false;
            this.areBtnsDisabled = false;
            this.successAlert.msg = '';
            this.close();
          }, 3000);
        } else {
          this.errorAlert.state = true;
          this.areBtnsDisabled = false;
          this.errorAlert.msg = data.data.error.message;
        }
      },
      close() {
        this.$store.commit('users/toggleApproveCompanyDialogState', false);
        this.$store.commit('users/setApprovedCompany', null);
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .approve-company-dialog {
    .v-btn {
      text-transform: initial;
    }
  }
</style>