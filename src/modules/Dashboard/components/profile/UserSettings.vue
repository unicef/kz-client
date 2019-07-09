<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">{{ $t('userSettings.title') }}</v-toolbar>
      <change-password-form />
    </v-flex>
  </v-layout>
</template>

<script>
  import store from '@/store';
  import ChangePasswordForm from '@/shared/components/ChangePasswordForm';

  export default {
    name: 'UserSettings',
    components: {
      ChangePasswordForm,
    },
    async beforeRouteEnter(to, from, next) {
      if (!store.getters['dashboard/profile/showForm']) {
        next();
      } else {
        next('/dashboard/profile/user-form');
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>