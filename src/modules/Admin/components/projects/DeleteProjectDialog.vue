<template>
  <v-layout row justify-center>
    <v-dialog 
      transition="slide-y-transition"
      v-model='deleteDialog' 
      @keydown.esc='close' 
      persistent 
      max-width="290">
      <v-card class="confirm-dialog px-4 py-4">
        <v-card-title class="headline">{{ $t('deleteProjectDialog.title') }}</v-card-title>
        <!-- Alert -->
        <v-layout row v-if='errorAlert.state'>
            <v-flex sm12 py-2 px-4>
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
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat :disabled="areBtnsDisabled" @click="close">{{ $t('common.btns.cancel') }}</v-btn>
          <v-btn color="green darken-1" flat :disabled="areBtnsDisabled" @click="deleteProject">{{ $t('common.btns.delete') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'DeleteProjectDialog',
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
      deleteDialog: {
        get() {
          return this.$store.getters['admin/projects/getDeleteProjectDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
    },
    methods: {
      async deleteProject() {
        this.areBtnsDisabled = true;
        const data = await this.$store.dispatch('admin/projects/deleteProject', this.$route.params.id);

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
      },
      close() {
        this.$store.commit('admin/projects/toggleDeleteProjectDialogState', false);
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