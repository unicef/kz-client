<template>
  <v-app>
    <router-view />
  </v-app>
</template>
<script>
  import store from '@/store';
  
  export default {
      name: 'app',
      data() {
        return {
          idleTimer: null,
        };
      },
      created() {
        this.$store.dispatch('global/fetchLanguagesData');
        if (store.getters['auth/auth/isAuthenticated']) {
          this.$store.dispatch('auth/auth/getMyInfo');
        }

        // Add user idle time detection
        this.refreshIdleTimer();
        document.addEventListener('mousedown', this.refreshIdleTimer);
        document.addEventListener('mousemove', this.refreshIdleTimer);
        document.addEventListener('keydown', this.refreshIdleTimer);
        document.addEventListener('touchstart', this.refreshIdleTimer);
      },
      destroyed() {
        clearTimeout(this.idleTimer);
        document.removeEventListener('mousedown', this.refreshIdleTimer);
        document.removeEventListener('mousemove', this.refreshIdleTimer);
        document.removeEventListener('keydown', this.refreshIdleTimer);
        document.removeEventListener('touchstart', this.refreshIdleTimer);
      },
      computed: {
        isAuthenticated() {
          return store.getters['auth/auth/isAuthenticated'];
        },
        isAdminPath() {
          return this.$route.path.indexOf('admin') !== -1;
        },
      },
      methods: {
        refreshIdleTimer() {
          if (!this.isAuthenticated) {
            return;
          }
          clearTimeout(this.idleTimer);
          this.idleTimer = setTimeout(() => {
            // Log out the user on 15 minutes of inactivity
            this.$store.dispatch('auth/auth/logOut');
            if (this.isAdminPath) {
              this.$router.push('/auth/login-admin');
            } else {
              this.$router.push('/auth/login');
            }
          }, 150 * 60 * 1000);
        },
      },
  };
</script>
<style lang="scss">
  @import 'vuetify/dist/vuetify.min.css';
  @import '~@/assets/styles/index';
  #app {
    font-family: 'San Francisco', 'Roboto', 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>