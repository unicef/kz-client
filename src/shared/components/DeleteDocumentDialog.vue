<template>
  <v-layout row justify-center>
    <v-dialog 
      transition="slide-y-transition"
      v-model='deleteDialog' 
      @keydown.esc='close' 
      persistent 
      max-width="290">
      <v-card class="confirm-dialog">
        <v-card-title class="headline">{{ $t('deleteDocumentDialog.title') }}</v-card-title>
        <!-- Alert -->
        <v-layout row v-if='errorAlert.state'>
            <v-flex sm12 py-2 px-4>
              <v-alert :value="errorAlert.state" type="error">
                {{ errorAlert.msg }}
            </v-alert>
            </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="close">{{ $t('common.btns.cancel') }}</v-btn>
          <v-btn color="green darken-1" flat @click="deleteDocument">{{ $t('common.btns.delete') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'DeleteDocumentDialog',
    data() {
      return {
        id: '',
        errorAlert: {
          state: false,
          msg: '',
        },
      };
    },
    computed: {
      deleteDialog: {
        get() {
          return this.$store.getters['global/getDeleteDocumentDialogState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      deleteDocumentData() {
        return this.$store.getters['global/getDeleteDocumentData'];
      },
      isPartnerDocument() {
        return this.deleteDocumentData.type === 'partner';
      },
    },
    methods: {
      async deleteDocument() {
        let data;
        if (this.isPartnerDocument) {
          // delete company doc
          data = await this.$store.dispatch('users/deleteCompanyDocument', this.deleteDocumentData.id);
        } else {
          // delete project doc
          data = await this.$store.dispatch('projects/deleteProjectDocument', this.deleteDocumentData.id);
        }

        if (data.data.success) {
          if (this.isPartnerDocument) {
            // delete company doc from list
            this.$store.commit('users/deleteCompanyDocument', this.deleteDocumentData.id);
          } else {
            // delete project doc from list
            this.$store.commit('projects/deleteProjectDocument', this.deleteDocumentData.id);
          }

          this.$store.commit('global/setDeleteDocumentData', null);
          this.close();
        } else {
          this.errorAlert.state = true;
          this.errorAlert.msg = data.data.error.message;
          const that = this;
          setTimeout(() => {
            that.close();
          }, 3000);
        }
      },
      close() {
        this.$store.commit('global/toggleDeleteDocumentDialogState', false);
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