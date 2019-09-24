<template>
  <v-layout row justify-center>
    <v-dialog
      transition="slide-y-transition"
      v-model="faceReportDialog"
      @keydown.esc="close"
      persistent
      max-width="550"
    >
      <v-card class="face-report-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('faceFormDialog.title') }}</v-card-title>
        <v-card-text>
          <div class="title mb-4" v-if="faceReportStatus === 'waiting' || faceReportStatus === 'reject'">{{ $t('faceFormDialog.waitingStageTitle') }}</div>
          <div class="title mb-4" v-if="!activitiesRejectedToSubmit.length && faceReportStatus === 'confirm'">{{ $t('faceFormDialog.confirmStageTitle') }}</div>
          <div class="title mb-4" v-if="!activitiesRejectedToSubmit.length && faceReportStatus === 'validate'">{{ $t('faceFormDialog.validateStageTitle') }}</div>
          <div class="title mb-4" v-if="!activitiesRejectedToSubmit.length && faceReportStatus === 'approve'">{{ $t('faceFormDialog.approveStageTitle') }}</div>
          <div class="title mb-4" v-if="!activitiesRejectedToSubmit.length && faceReportStatus === 'verify'">{{ $t('faceFormDialog.verifyStageTitle') }}</div>
          <div class="title mb-4" v-if="activitiesRejectedToSubmit.length && faceReportStatus !== 'reject'">{{ $t('faceFormDialog.rejectStageTitle') }}</div>
          <div class="title mb-4" v-if="!activitiesRejectedToSubmit.length && (faceReportStatus === 'validate' || faceReportStatus === 'certify' || faceReportStatus === 'approve')">{{ $t('faceFormDialog.chooseUserTitle') }}</div>
          <v-form ref="nextUserForm" lazy-validation v-if="!activitiesRejectedToSubmit.length && (faceReportStatus === 'validate' || faceReportStatus === 'certify' || faceReportStatus === 'approve')">
            <v-layout row>
              <v-flex sm12>
                <v-select
                  :items="faceReportUsers"
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
    name: 'FaceReportDialog',
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
      faceReportDialog: {
        get() {
          return this.$store.getters['projects/getFaceReportDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      submittedFaceReportData() {
        return this.$store.getters['projects/getSubmittedFaceReportData'];
      },
      activitiesRejectedToSubmit() {
        let activitiesRejected = [];
        /* eslint-disable */
        if (this.submittedFaceReportData) {
          activitiesRejected = this.submittedFaceReportData.activities.filter((item) => {
            return item.isRejected && item.rejectReason;
          });
        }
        /* eslint-disable */
        return activitiesRejected;
      },
      faceReportStatus() {
        return (this.$store.getters['projects/getProjectInfo'].stage) ? this.$store.getters['projects/getProjectInfo'].stage.status : '';
      },
      faceReportUsers() {
        return this.$store.getters['projects/getFaceReportUsers'];
      },
      storeMethodForReport() {
        let storeMethod = 'projects/createFaceReport';

        switch (this.faceReportStatus) {
          case 'waiting':
            storeMethod = 'projects/createFaceReport';
            break;
          case 'confirm':
            storeMethod = 'projects/approveFaceReport';
            break;
          case 'validate':
            storeMethod = 'projects/approveFaceReport';
            break;
          case 'certify':
            storeMethod = 'projects/approveFaceReport';
            break;
          case 'approve':
            storeMethod = 'projects/approveFaceReport';
            break;
          case 'verify':
            storeMethod = 'projects/approveFaceReport';
            break;
          case 'reject':
            storeMethod = 'projects/createFaceReportAfterReject';
            break;
          default:
            break;
        }
        return storeMethod;
      },
    },
    methods: {
      async sendFace() {
        if (!this.$refs.nextUserForm || (this.$refs.nextUserForm && this.$refs.nextUserForm.validate())) {
          this.$store.commit('projects/setSubmittedFaceReportDataField', {
              fieldKey: 'nextUser',
              fieldValue: (this.nextUser) ? this.nextUser.id : null,
          });

          this.areBtnsDisabled = true;

          const data = await this.$store.dispatch(this.storeMethodForReport, this.submittedFaceReportData);

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
        this.$store.commit('projects/toggleFaceReportDialogState', false);
        if (this.$refs.nextUserForm) {
          this.$refs.nextUserForm.reset();
        }
        this.$store.commit('projects/setSubmittedFaceReportData', null);
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
.face-report-dialog {
  .v-btn {
    text-transform: initial;
  }
}
</style>