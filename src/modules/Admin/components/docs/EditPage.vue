<template>
  <div class="edit-page">
    <!-- Content -->
    <v-toolbar class="headline justify-center" color="light-blue">
      <div>
        {{ $t('docs.editPageTitle') }}
      </div>
    </v-toolbar>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'EditPage',
    data() {
      return {
      };
    },
    async created() {
      const { id } = this.$route.params;
      await this.getDoc({ id });
    },
    methods: {
      ...mapActions({
        getDoc: 'admin/docs/getDoc',
      }),
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
