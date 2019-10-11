<template>
  <footer class='footer color="light-blue" pt-2 mt-4'>
    <div class="container">
      <v-layout wrap>
          <v-flex class="xs-12 sm3 md3 lg2 py-2" v-if="isClientPath && isAuthenticated">
              <router-link class='link' to='/dashboard/docs/terms' >
                {{ $t('common.btns.agreements') }}
              </router-link>
          </v-flex>
          <v-flex class="xs-12 sm9 md9 lg10 py-2">
              &copy;&nbsp;{{ new Date().getFullYear() }}
              UNICEF blockchain project
          </v-flex>
      </v-layout>
    </div>
  </footer>
</template>

<script>
  import store from '@/store';

  export default {
    name: 'FooterComponent',
    computed: {
      isAuthenticated() {
        return store.getters['auth/auth/isAuthenticated'];
      },
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isAdminPath() {
        return this.$route.path.indexOf('admin') !== -1;
      },
      isClientPath() {
        return this.$route.path.indexOf('dashboard') !== -1;
      },
      isAdmin() {
        return this.roles.indexOf('a') !== -1;
      },
      isUnicefUser() {
        return this.roles.indexOf('ro') !== -1 || this.roles.indexOf('bo') !== -1 || this.roles.indexOf('dr') !== -1 || this.roles.indexOf('om') !== -1;
      },
      isPartner() {
        return this.roles.indexOf('ra') !== -1 || this.roles.indexOf('ap') !== -1;
      },
      isDonor() {
        return this.roles.indexOf('d') !== -1;
      },
    },
    methods: {
    },
  };
</script>

<style lang="scss" scoped>
.footer {
    border-top: 1px solid #03a9f4;
    width: 100%;
}
</style>