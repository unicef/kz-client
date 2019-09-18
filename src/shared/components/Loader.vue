<template>
  <div
    v-if="loader"
    class="progress d-flex justify-center align-center"
  >
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Loader',
    computed: {
      ...mapGetters({
        loader: 'global/getLoader',
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(white, 0.4);
  }
</style>