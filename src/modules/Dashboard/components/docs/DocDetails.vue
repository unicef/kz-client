<template>
  <v-layout wrap justify-center>
    <v-flex sm12 md8>
      <!-- Title -->
      <h1 class="mb-3">
        <span v-show="$i18n.locale === 'en'">
          {{ document.titleEn }}
        </span>
        <span v-show="$i18n.locale === 'ru'">
          {{ document.titleRu }}
        </span>
      </h1>
      <!-- Content -->
      <div
        v-show="$i18n.locale === 'en'"
        v-html="document.textEn"
      />
      <div
        v-show="$i18n.locale === 'ru'"
        v-html="document.textRu"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DocDetails',
  data() {
    return {
      isHide: true,
    };
  },
  computed: {
    ...mapGetters({
      document: 'dashboard/docs/getDocument',
    }),
  },
  async created() {
    const { slug } = this.$route.params;
    const { success, error } = await this.fetchDocument({ slug });

    if (!success && error.status === 404) {
      this.$router.push({ name: 'documents-list' });
    }
  },
  methods: {
    ...mapActions({
      fetchDocument: 'dashboard/docs/fetchDocument',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }
</style>
