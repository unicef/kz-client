<template>
  <v-layout row justify-center>
    <v-dialog
      transition="slide-y-transition"
      v-model="terminateDialog"
      @keydown.esc="close"
      persistent
      max-width="550"
    >
      <v-card class="confirm-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('terminateProjectDialog.title') }}</v-card-title>
        <v-card-text>
          <v-form ref="terminateProjectForm" lazy-validation>
            <v-layout row>
              <v-radio-group
                :rules="rules.radioRequired"
                required
                v-model="credentials.reason"
              >
                <v-layout wrap>
                  <v-flex xs12 mt-2 mb-2 v-for="reason in terminationReasons" :key="reason.key">
                    <v-radio :label="reason.title" :value="reason" color="primary"></v-radio>
                  </v-flex>
                </v-layout>
              </v-radio-group>
            </v-layout>
          </v-form>
        </v-card-text>
        <!-- Alert -->
        <v-layout row v-if="errorAlert.state">
          <v-flex sm12 py-2 px-4>
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
          <v-spacer></v-spacer>
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
            @click="terminateProject"
          >{{ $t('common.btns.terminate') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'TerminateProjectDialog',
    data() {
      return {
        credentials: {
          id: null,
          reason: {},
        },
        rules: {
          radioRequired: [
            /* eslint-disable no-new */
            v => !!v&&!!v.key || this.$root.$t('common.fields.validation.field.required'),
          ],
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
      };
    },
    computed: {
      terminateDialog: {
        get() {
          return this.$store.getters['admin/projects/getTerminateProjectDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      terminationReasons() {
        return this.$store.getters['admin/projects/getTerminateProjectReasons'];
      },
    },
    methods: {
      async terminateProject() {
        if (this.$refs.terminateProjectForm.validate()) {
            this.areBtnsDisabled = true;
            this.credentials.id = this.$route.params.id;
            let data = await this.$store.dispatch('admin/projects/terminateProject', this.credentials);

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
                this.$router.push({ name: 'projects' });
            }, 3000);
            } else {
            this.errorAlert.state = true;
            this.areBtnsDisabled = false;
            this.errorAlert.msg = data.data.error.message;
            }
        }
      },
      close() {
        this.$refs.terminateProjectForm.reset();
        this.$store.commit('admin/projects/toggleTerminateProjectDialogState', false);
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
.confirm-dialog {
  .v-btn {
    text-transform: initial;
  }
}
</style>