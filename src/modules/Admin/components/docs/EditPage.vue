<template>
  <div class="edit-page">
    <v-toolbar class="headline justify-center" color="light-blue">
      <div>
        {{ $t('docs.editPageTitle') }}
      </div>
    </v-toolbar>
    <v-card>
      <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
        <!-- Alerts -->
        <v-flex class="mb-3">
          <v-alert
            :value="successAlert.state"
            type="success"
          >
            {{ successAlert.msg }}
          </v-alert>
          <v-alert
            :value="errorAlert.state"
            type="error"
          >
            {{ errorAlert.msg }}
          </v-alert>
        </v-flex>

        <!-- Form -->
        <doc-form
          button-name='edit'
          @submit="onEdit"
        />
      </v-container>
    </v-card>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import DocForm from './DocForm';

  export default {
    name: 'EditPage',
    components: {
      DocForm,
    },
    data() {
      return {
        id: null,
        successAlert: {
          state: false,
          msg: '',
        },
        errorAlert: {
          state: false,
          msg: '',
        },
      };
    },
    async created() {
      const { id } = this.$route.params;
      this.id = id;
      await this.getDoc({ id });
    },
    methods: {
      ...mapActions({
        getDoc: 'admin/docs/getDoc',
        updateDoc: 'admin/docs/updateDoc',
      }),

      async onEdit() {
        this.clearAlerts();

        const { success, data, error } = await this.updateDoc({ id: this.id });

        if (!success) {
          this.errorAlert.state = true;
          this.errorAlert.msg = error.message;
          this.isCreate = false;
          this.$vuetify.goTo(0, 'easeInOutCubic');
          return;
        }

        this.successAlert.state = true;
        this.successAlert.msg = data.message;
        this.isCreate = false;
        this.$vuetify.goTo(0, 'easeInOutCubic');
      },
      clearAlerts() {
        this.errorAlert.state = false;
        this.errorAlert.msg = '';
        this.successAlert.state = false;
        this.successAlert.msg = '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }

  .edit-page {
    max-width: 880px;
    width: 100%;
    margin: 0 auto;
  }
</style>
