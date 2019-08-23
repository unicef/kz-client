<template>
  <v-layout row justify-center>
    <v-dialog
      transition="slide-y-transition"
      v-model="setIpDialog"
      @keydown.esc="close"
      persistent
      max-width="550"
    >
      <v-card class="set-ip-dialog px-2 py-2">
         <v-layout row justify-end>
          <v-btn flat icon @click='close' class='dialog-close' :disabled="areBtnsDisabled">
            <svgicon class='svg-icon' width="12" height="12" name="close"  />
          </v-btn>
         </v-layout>
        <v-card-title v-if="step===1" class="headline pt-0">
          {{ $t('setIpDialog.title') }}
        </v-card-title>
        <v-card-title v-if="step===2" class="headline pt-0">
          {{ $t('setIpDocuments.title') }}
        </v-card-title>
        <v-card-title v-if="step===3" class="headline pt-0">
          {{ $t('setIpTranches.title') }}
        </v-card-title>
        <v-card-title v-if="step===4" class="headline pt-0">
          {{ $t('setIpComplete.title') }}
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md class="px-0 pb-0" :class="{ 'px-0': $vuetify.breakpoint.xs }">
            <!-- IP -->
            <v-form ref="ipForm" v-show="step===1" lazy-validation>
              <ip-selection
                ref="ipSelection"
                @getIp="getIp"
              />
            </v-form>

            <!-- IP documents -->
            <v-form ref="ipDocumentsForm" v-show="step===2" lazy-validation>
              <ip-documents
                ref="ipDocuments"
                :projectData="projectData"
                @getIpDocuments="getIpDocuments"
              />
            </v-form>

            <!-- IP tranches -->
            <v-form ref="ipTranchesForm" v-show="step===3" lazy-validation>
              <ip-tranches
                ref="ipTranches"
                @getIpTranches="getIpTranches"
              />
            </v-form>

            <!-- confirm IP -->
            <!-- <v-layout row v-show="step===4">
              Are you sure?
            </v-layout> -->

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
              <v-btn
                type="button"
                @click="step--"
                v-if="step > 1"
                color="error mb-2 mt-2"
                :disabled="areBtnsDisabled"
                depressed
              >{{ $t('common.btns.back') }}</v-btn>
              <v-btn
                type="button"
                @click="submitForm"
                v-if="step === 4"
                color="info mb-2 mt-2"
                :disabled="areBtnsDisabled"
                depressed
              >{{ $t('common.btns.save') }}</v-btn>
              <v-btn
                type="button"
                @click="submitForm"
                v-if="(step < 4)"
                color="info mb-2 mt-2"
                depressed
              >{{ $t('common.btns.next') }}</v-btn>
            </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import IpSelection from '@/shared/components/IpSelection';
  import IpDocuments from '@/shared/components/IpDocuments';
  import IpTranches from '@/shared/components/IpTranches';

  export default {
    name: 'SetIpDialog',
    components: {
      IpSelection,
      IpDocuments,
      IpTranches,
    },
    data() {
      return {
        step: 1,
        credentials: {},
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
      setIpDialog: {
        get() {
          return this.$store.getters['projects/getSetIpDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      isAdminPath() {
        return this.$route.path.indexOf('admin') !== -1;
      },
      isClientPath() {
        return this.$route.path.indexOf('dashboard') !== -1;
      },
      projectData() {
        return this.$store.getters['projects/getProjectData'];
      },
    },
    async created() {
      await this.$store.dispatch('projects/getAvailablePartners');
    },
    destroyed() {
      this.$store.commit('projects/setAvailablePartners', []);
    },
    methods: {
      async setIp() {
        this.areBtnsDisabled = true;
        this.credentials.id = this.projectData.id;
        const response = await this.$store.dispatch('projects/setIp', this.credentials);

        const that = this;
        if (response.data.success) {
          this.errorAlert.state = false;
          this.errorAlert.msg = '';
          this.successAlert.state = true;
          this.successAlert.msg = response.data.data.message;

          setTimeout(async () => {
            this.successAlert.state = false;
            this.successAlert.msg = '';
            that.areBtnsDisabled = false;
            this.close();
          }, 3000);
        } else {
          this.successAlert.state = false;
          this.successAlert.msg = '';
          this.errorAlert.state = true;
          this.areBtnsDisabled = false;
          this.errorAlert.msg = response.data.error.message;
        }
      },
      submitForm() {
          switch (this.step) {
          case 1:
            if (this.$refs.ipForm.validate()) {
              this.$refs.ipSelection.getIp();
              this.step++;
            }
            break;
          case 2:
            if (this.$refs.ipDocumentsForm.validate() && this.$refs.ipDocuments.getIpDocuments()) {
              this.$refs.ipDocuments.getIpDocuments();
              this.step++;
            }
            break;
          case 3:
            if (this.$refs.ipTranchesForm.validate() && this.$refs.ipTranches.getIpTranches()) {
              this.$refs.ipTranches.getIpTranches();
              this.step++;
            }
            break;
          case 4:
            this.setIp();
            break;
          default:
            break;
        }
      },
      close() {
        this.$store.commit('projects/toggleSetIpDialogState', false);
        this.$store.commit('projects/setAvailablePartners', []);
        // reset lower all forms
        this.$refs.ipForm.reset();
        this.$refs.ipDocuments.clearIpDocuments();
        this.$refs.ipTranches.clearTranches();
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
        this.step = 1;
        this.credentials = {};
      },
      getIp(ip) {
        console.log(ip);
        this.credentials.partner = ip;
      },
      getIpDocuments(ipDocs) {
        console.log(ipDocs);
        this.credentials.documents = ipDocs;
      },
      getIpTranches(ipTranches) {
        console.log(ipTranches);
        this.credentials.tranches = ipTranches;
      },
    },
  };
</script>

<style lang="scss" scoped>
.set-ip-dialog {
  .v-btn {
    text-transform: initial;
  }
}
</style>