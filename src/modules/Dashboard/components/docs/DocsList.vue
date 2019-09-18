<template>
  <v-layout wrap justify-center>
    <v-flex xs12 md8 mt-4>
      <v-toolbar class="headline justify-center" color="light-blue">
        {{ $t('docs.allPages') }}
      </v-toolbar>
      <v-card>
        <v-container :class="{ 'pt-4': $vuetify.breakpoint.xs }">
          <!-- Alerts -->
          <v-flex class="mb-3">
            <v-alert
              :value="errorAlert.state"
              type="error"
            >
              {{ errorAlert.msg }}
            </v-alert>
          </v-flex>
          <div
            v-for="doc in documents"
            :key="doc.id"
            class="mb-2"
          >
            <router-link :to="'/dashboard/docs/' + doc.key">
              <div v-if="$i18n.locale === 'en'">
                {{ doc.titleEn }}
              </div>
              <div v-if="$i18n.locale === 'ru'">
                {{ doc.titleRu }}
              </div>
            </router-link>
          </div>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'DocumentList',
  data() {
    return {
      errorAlert: {
        state: false,
        msg: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      documents: 'dashboard/docs/getDocuments',
    }),
  },
  async created() {
    this.setLoader(true);
    const { success, error } = await this.fetchDocuments();

    if (!success) {
      this.errorAlert.state = true;
      this.errorAlert.msg = error.message;
      this.setLoader(false);
    }

    this.setLoader(false);
  },
  methods: {
    ...mapActions({
      fetchDocuments: 'dashboard/docs/fetchDocuments',
    }),
    ...mapMutations({
      setLoader: 'global/setLoader',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
