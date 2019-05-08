<template>
  <v-layout wrap>
    <!-- Content -->
    <v-flex xs12 class='d-flex mb-5' sm12>
      <div class="ui_title">{{ document.title }}</div>
    </v-flex>
    <v-flex xs12 class='d-flex mb-5' sm12>
      <div class='content' v-html='document.content'></div>
    </v-flex>

    <!-- Alert -->
    <v-flex class='title' xs12 v-if='alert'>
      <div class='mb-2'>
        {{ $t('common.labels.errorPageLoad') }}
      </div>
      <div>
        {{ $t('common.labels.checkLater') }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Document',
    data() {
      return {
      };
    },
    computed: {
      document() {
        return this.$store.getters['dashboard/docs/getDocument'];
      },
      currentPage() {
          return this.$store.getters['dashboard/docs/getCurrentPage'];
      },
      alert() {
        return this.$store.getters['dashboard/docs/getErrorAlert'];
      },
    },
  };
</script>

<style lang="scss" scoped>
  .content {
    overflow-x: auto;
  }
</style>
