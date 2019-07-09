<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-toolbar class="headline justify-center mt-4" color="light-blue">{{ $t('passwordSettings.title') }}</v-toolbar>
      <change-password-form />
    </v-flex>
  </v-layout>
</template>

<script>
  import ChangePasswordForm from '@/shared/components/ChangePasswordForm';

  export default {
    name: 'PasswordSettings',
    components: {
      ChangePasswordForm,
    },
  };
</script>

<style lang="scss" scoped>
</style>