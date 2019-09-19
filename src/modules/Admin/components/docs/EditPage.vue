<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center" color="light-blue">
        <div>{{ $t('docs.editPageTitle') }}</div>
      </v-toolbar>
      <v-card>
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <!-- Alerts -->
          <v-flex class="mb-3">
            <v-alert :value="successAlert.state" type="success">{{ successAlert.msg }}</v-alert>
            <v-alert :value="errorAlert.state" type="error">{{ errorAlert.msg }}</v-alert>
          </v-flex>

          <!-- Form -->
          <doc-form button-name="edit" @submit="onEdit" />
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
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
      const { success, error } = await this.getDoc({ id });

      if (!success && error.status === 404) {
        this.$router.push({ path: '/admin/not-found' });
      }
    },
    mounted() {
      this.$vuetify.goTo(0, 'easeInOutCubic');
    },
    destroyed() {
      this.clearDocData();
    },
    methods: {
      ...mapActions({
        getDoc: 'admin/docs/getDoc',
        updateDoc: 'admin/docs/updateDoc',
      }),
      ...mapMutations({
        clearDocData: 'admin/docs/clearDocData',
        setLoader: 'global/setLoader',
      }),

      async onEdit() {
        this.clearAlerts();
        this.setLoader(true);

        const { success, data, error } = await this.updateDoc({ id: this.id });

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
          this.successAlert.state = false;
          this.successAlert.msg = '';
          this.$router.push({ name: 'docs-list' });
        }, 3000);
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
