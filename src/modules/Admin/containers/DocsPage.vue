<template>
  <div
    class="container pt-5"
  >
    <loader />

    <!-- Content -->
    <router-view/>
  </div>
</template>

<script>
import Loader from '@/shared/components/Loader';

export default {
    name: 'HelpPage',
    components: {
      Loader,
    },
};
</script>

<style lang="scss" scoped>

</style>