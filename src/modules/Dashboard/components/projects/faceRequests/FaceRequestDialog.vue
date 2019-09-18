<template>
  <v-layout row justify-center>
    <v-dialog
      transition="slide-y-transition"
      v-model="faceRequestDialog"
      @keydown.esc="close"
      persistent
      max-width="550"
    >
      <v-card class="face-request-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('faceFormDialog.title') }}</v-card-title>
        <v-card-text>
          <div class="title mb-4" v-if="faceRequestStatus === 'waiting'">{{ $t('faceFormDialog.waitingStageTitle') }}</div>
          <div class="title mb-4" v-if="faceRequestStatus === 'confirm'">{{ $t('faceFormDialog.confirmStageTitle') }}</div>
          <div class="title mb-4" v-if="faceRequestStatus === 'validate'">{{ $t('faceFormDialog.validateStageTitle') }}</div>
          <div class="title mb-4" v-if="faceRequestStatus === 'approve'">{{ $t('faceFormDialog.approveStageTitle') }}</div>
          <div class="title mb-4" v-if="faceRequestStatus === 'verify'">{{ $t('faceFormDialog.verifyStageTitle') }}</div>
          <div class="title mb-4" v-if="faceRequestStatus === 'validate' || faceRequestStatus === 'certify' || faceRequestStatus === 'approve'">{{ $t('faceFormDialog.chooseUserTitle') }}</div>
          <v-form ref="nextUserForm" lazy-validation v-if="faceRequestStatus === 'validate' || faceRequestStatus === 'certify' || faceRequestStatus === 'approve'">
            <v-layout row>
              <v-flex sm12>
                <v-select
                  :items="faceRequestUsers"
                  v-model="nextUser"
                  :label="$t('common.fields.unicefUser') + '*'"
                  item-text="user"
                  item-value="id"
                  return-object
                  :rules="rules.selectFieldRequired"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
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
            @click="sendFace"
          >{{ $t('common.btns.submitForm') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'FaceRequestDialog',
    data() {
      return {
        nextUser: null,
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
          selectFieldRequired: [
            /* eslint-disable no-new */
            v => !!v || this.$root.$t('common.fields.validation.field.required'),
          ],
        },
      };
    },
    computed: {
      faceRequestDialog: {
        get() {
          return this.$store.getters['projects/getFaceRequestDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      submittedFaceRequestData() {
        return this.$store.getters['projects/getSubmittedFaceRequestData'];
      },
      faceRequestStatus() {
        return (this.$store.getters['projects/getProjectInfo'].stage) ? this.$store.getters['projects/getProjectInfo'].stage.status : '';
      },
      faceRequestUsers() {
        return this.$store.getters['projects/getFaceRequestUsers'];
      },
    },
    methods: {
      async sendFace() {
        if (!this.$refs.nextUserForm || (this.$refs.nextUserForm && this.$refs.nextUserForm.validate())) {
          this.$store.commit('projects/setSubmittedFaceRequestDataField', {
              fieldKey: 'nextUser',
              fieldValue: (this.nextUser) ? this.nextUser.id : null,
          });

          this.areBtnsDisabled = true;

          const storeMethod = this.faceRequestStatus === 'waiting' ? 'projects/createFaceRequest' : 'projects/approveFaceRequest';
          const data = await this.$store.dispatch(storeMethod, this.submittedFaceRequestData);

          if (data.data.success) {
            if (this.$refs.nextUserForm) {
              this.$refs.nextUserForm.reset();
            }
            this.errorAlert.state = false;
            this.errorAlert.msg = '';
            this.successAlert.state = true;
            this.successAlert.msg = data.data.data.message;

            setTimeout(() => {
              this.successAlert.state = false;
              this.areBtnsDisabled = false;
              this.successAlert.msg = '';
              this.close();
              this.$router.push(`/dashboard/projects/project/${this.$route.params.id}`);
            }, 3000);
          } else {
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.errorAlert.msg = data.data.error.message;
          }
        }
      },
      close() {
        this.$store.commit('projects/toggleFaceRequestDialogState', false);
        if (this.$refs.nextUserForm) {
          this.$refs.nextUserForm.reset();
        }
        this.$store.commit('projects/setSubmittedFaceRequestData', null);
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
.face-request-dialog {
  .v-btn {
    text-transform: initial;
  }
}
</style>