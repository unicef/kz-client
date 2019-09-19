<template>
  <v-layout wrap justify-center>
    <v-flex v-show="isShow" sm12>
      <!-- Title -->
      <h1 class="mb-3">
        <span v-show="$i18n.locale === 'en'">{{ document.titleEn }}</span>
        <span v-show="$i18n.locale === 'ru'">{{ document.titleRu }}</span>
      </h1>
      <!-- Content -->
      <div v-show="$i18n.locale === 'en'" v-html="document.textEn" />
      <div v-show="$i18n.locale === 'ru'" v-html="document.textRu" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'DocDetails',
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapGetters({
      document: 'dashboard/docs/getDocument',
    }),
  },
  watch: {
  /* eslint-disable */
    '$route': async function(to, from) {
      await this.loadDocument();
    },
  /* eslint-disable */
}, 
  async created() {
    await this.loadDocument();
  },
  methods: {
    ...mapActions({
      fetchDocument: 'dashboard/docs/fetchDocument',
    }),
    ...mapMutations({
      setLoader: 'global/setLoader',
    }),
    async loadDocument() {
      this.setLoader(true);
      const { slug } = this.$route.params;
      const { success, error } = await this.fetchDocument({ slug });

      if (!success && error.status === 404) {
        this.setLoader(false);
        this.$router.push({ name: 'documents-list' });
      }

      this.isShow = true;
      this.setLoader(false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
