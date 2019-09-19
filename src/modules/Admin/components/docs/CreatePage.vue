<template>
  <v-layout wrap>
    <v-flex xs12>
      <!-- Content -->
      <v-toolbar class="headline justify-center" color="light-blue">
        <div>{{ $t('docs.createPageTitle') }}</div>
      </v-toolbar>

      <v-card>
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <div>{{ $t('docs.createPageSubheading') }}</div>

          <!-- Alerts -->
          <v-flex class="mb-3">
            <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
            <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
          </v-flex>

          <!-- Form -->
          <doc-form button-name="create" @submit="onCreate" />
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import DocForm from './DocForm';

  export default {
    name: 'CreatePage',
    components: {
      DocForm,
    },
    data() {
      return {
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
    created() {
      this.clearDocData();
    },
    methods: {
      ...mapActions({
        createDoc: 'admin/docs/createDoc',
      }),
      ...mapMutations({
        clearDocData: 'admin/docs/clearDocData',
        setLoader: 'global/setLoader',
      }),

      async onCreate() {
        this.clearAlerts();
        this.setLoader(true);

        const { success, data, error } = await this.createDoc();

        if (!success) {
          this.setLoader(false);
          this.errorAlert.state = true;
          this.errorAlert.msg = error.message;
          this.$vuetify.goTo(0, 'easeInOutCubic');
          return;
        }

        this.setLoader(false);
        this.successAlert.state = true;
        this.successAlert.msg = data.message;
        this.$vuetify.goTo(0, 'easeInOutCubic');

        setTimeout(() => {
          this.$router.push({ name: 'docs-list' });
        }, 2600);
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
</style>
