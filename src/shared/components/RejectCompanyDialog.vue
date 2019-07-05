<template>
  <v-layout row justify-center>
    <v-dialog 
      transition="slide-y-transition"
      v-model='rejectCompanyDialog' 
      @keydown.esc='close' 
      persistent 
      max-width="550">
      <v-card class="reject-company-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('rejectCompanyDialog.title1') }} {{rejectedCompany ? rejectedCompany.name : ''}}? {{ $t('rejectCompanyDialog.title2') }}</v-card-title>
        <v-card-text>
            <v-form ref="rejectCompanyForm" lazy-validation>
            <v-layout row>
                <v-flex sm12>
                    <v-textarea
                        name="Reason"
                        :label='$t("common.fields.rejectCompanyReason") + "*"'
                        id="reason"
                        v-model="reason"
                        type="text"
                        :rules="rules.reason"
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
          <v-btn color="red darken-1" flat @click="close">{{ $t('common.btns.cancel') }}</v-btn>
          <v-btn color="green darken-1" flat @click="rejectCompany">{{ $t('common.btns.reject') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'RejectCompanyDialog',
    data() {
      return {
        reason: '',
        errorAlert: {
          state: false,
          msg: '',
        },
        successAlert: {
          state: false,
          msg: '',
        },
        rules: {
          reason: [
            /* eslint-disable no-new */
            v => !!v || this.$t('common.fields.validation.field.required'),
          ],
        },
      };
    },
    computed: {
      rejectCompanyDialog: {
        get() {
          return this.$store.getters['users/getRejectCompanyDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      rejectedCompany() {
        return this.$store.getters['users/getRejectedCompany'];
      },
    },
    methods: {
      async rejectCompany() {
        if (this.$refs.rejectCompanyForm.validate()) {
          const data = await this.$store.dispatch('users/rejectCompany', { id: this.rejectedCompany.id, reason: this.reason });

          if (data.data.success) {
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = data.data.data.message;

            setTimeout(() => {
              this.$store.commit('users/setCompanyDataField', { field: 'statusId', value: 'new' });
              this.successAlert.state = false;
              this.successAlert.msg = '';
              this.close();
            }, 3000);
          } else {
            this.errorAlert.state = true;
            this.errorAlert.msg = data.data.error.message;
          }
        }
      },
      close() {
        this.$store.commit('users/toggleRejectCompanyDialogState', false);
        this.$refs.rejectCompanyForm.reset();
        this.$store.commit('users/setRejectedCompany', null);
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .reject-company-dialog {
    .v-btn {
      text-transform: initial;
    }
  }
</style>