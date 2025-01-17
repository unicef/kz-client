<template>
  <v-navigation-drawer
    v-model='menuState'
    absolute
    temporary
    class='nav-drawer py-2'>
    <div class='text-xs-right'>
      <v-btn flat icon @click='close'>
        <svgicon class='svg-icon' width="24" height="24" name="close"  />
      </v-btn>
    </div>

    <v-list>
      <!-- links for Admin -->
      <v-list-tile @click='close' v-if="isAuthenticated && isAdmin && (isAdminPath || isNotFoundAdminPath)" v-for='route in routesAdmin' :key='route.title' :to='route.link'>
        <v-list-tile-content>
          {{ route.title }}
        </v-list-tile-content>
      </v-list-tile>

      <!-- links for Unicef User -->
      <v-list-tile @click='close' v-if="isAuthenticated && isUnicefUser && (isClientPath || isNotFoundClientPath)" v-for='route in routesUnicefUser' :key='route.title' :to='route.link'>
        <v-list-tile-content>
          {{ route.title }}
        </v-list-tile-content>
      </v-list-tile>

      <!-- links for Partner -->
      <v-list-tile @click='close' v-if="isAuthenticated && isPartner && (isClientPath || isNotFoundClientPath)" v-for='route in routesPartner' :key='route.title' :to='route.link'>
        <v-list-tile-content>
          {{ route.title }}
        </v-list-tile-content>
      </v-list-tile>

      <!-- links for Donor -->
      <v-list-tile @click='close' v-if="isAuthenticated && isDonor && (isClientPath || isNotFoundClientPath)" v-for='route in routesDonor' :key='route.title' :to='route.link'>
        <v-list-tile-content>
          {{ route.title }}
        </v-list-tile-content>
      </v-list-tile>

      <div v-if="$vuetify.breakpoint.smAndDown">
        <v-divider  />
        <v-list-tile v-if="isAuthenticated" @click='logOut'>
          <v-list-tile-content>
            {{ $t('common.btns.logOut') }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!isAuthenticated" @click='logIn'>
          <v-list-tile-content>
            {{ $t('common.btns.logIn') }}
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import '@/../static/icons/compiled-svg/close';

  export default {
    name: 'NavMenu',
    data() {
      return {
      };
    },
    created() {
    },
    computed: {
      menuState: {
        get() {
          return this.$store.getters['global/getNavMenuState'];
        },
        set(value) {
          if (!value) {
            this.close();
          }
        },
      },
      isAuthenticated() {
        return this.$store.getters['auth/auth/isAuthenticated'];
      },
      roles() {
        return this.$store.getters['global/getRoles'];
      },
      isAdminPath() {
        const adminUrl = `${location.protocol}//${location.host}/admin`;
        const currentLocation = `${window.location}`;
        return currentLocation.indexOf(adminUrl) !== -1;
      },
      isClientPath() {
        const clientUrl = `${location.protocol}//${location.host}/dashboard`;
        const currentLocation = `${window.location}`;
        return currentLocation.indexOf(clientUrl) !== -1;
      },
      isNotFoundAdminPath() {
        return this.$route.name === 'not-found';
      },
      isNotFoundClientPath() {
        return this.$route.name === 'not-found-page';
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
      showStepByStepForm() {
        return this.$store.getters['dashboard/profile/showForm'];
      },
      routesAdmin() {
        const routes = [
          {
            title: this.$t('header.users'),
            link: '/admin/users',
          },
          {
            title: this.$t('header.projects'),
            link: '/admin/projects',
          },
          {
            title: this.$t('header.finance'),
            link: '/admin/finance',
          },
          {
            title: this.$t('header.help'),
            link: '/admin/docs',
          },
          {
            title: this.$t('header.settings'),
            link: '/admin/settings',
          },
        ];
        return routes;
      },
      routesUnicefUserAll() {
        const routes = [
          {
            title: this.$t('header.profile'),
            link: '/dashboard/profile',
          },
          {
            title: this.$t('header.projects'),
            link: '/dashboard/projects',
          },
          {
            title: this.$t('header.finance'),
            link: '/dashboard/finance',
          },
          {
            title: this.$t('header.help'),
            link: '/dashboard/docs',
          },
          {
            title: this.$t('header.partners'),
            link: '/dashboard/partners',
          },
        ];
        return routes;
      },
      routesPartnerAll() {
        const routes = [
          {
            title: this.$t('header.profile'),
            link: '/dashboard/profile',
          },
          {
            title: this.$t('header.projects'),
            link: '/dashboard/projects',
          },
          {
            title: this.$t('header.finance'),
            link: '/dashboard/finance',
          },
          {
            title: this.$t('header.help'),
            link: '/dashboard/docs',
          },
        ];
        return routes;
      },
      routesDonorAll() {
        const routes = [
          {
            title: this.$t('header.profile'),
            link: '/dashboard/profile',
          },
          {
            title: this.$t('header.projects'),
            link: '/dashboard/projects/all-projects',
          },
          {
            title: this.$t('header.finance'),
            link: '/dashboard/finance',
          },
          {
            title: this.$t('header.help'),
            link: '/dashboard/docs',
          },
        ];
        return routes;
      },
      routesPartner() {
        /* eslint-disable */
        if (this.showStepByStepForm) {
          return this.routesPartnerAll.filter((item) => {
            return item.title === this.$t('header.profile');
          });
        }
        return this.routesPartnerAll;
      },
      routesUnicefUser() {
        if (this.showStepByStepForm) {
          return this.routesUnicefUserAll.filter((item) => {
            return item.title === this.$t('header.profile');
          });
        }
        return this.routesUnicefUserAll;
      },
      routesDonor() {
        if (this.showStepByStepForm) {
          return this.routesDonorAll.filter((item) => {
            return item.title === this.$t('header.profile');
          });
        }
        return this.routesDonorAll;
      },
    },
    methods: {
      close() {
        this.$store.commit('global/toggleNavMenu', false);
      },
      logOut() {
        this.$store.dispatch('auth/auth/logOut');
        if (this.isAdminPath) {
          this.$router.push('/auth/login-admin');
        } else {
          this.$router.push('/auth/login');
        }
        this.close();
      },
      logIn() {
        this.$router.push('/auth');
        this.close();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .nav-drawer {
    position: fixed;
    overflow: auto;
  }

  .chosen {
    background-color: #E0E0E0;
  }
</style>

