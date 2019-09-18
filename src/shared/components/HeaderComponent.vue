<template>
  <v-toolbar color="light-blue" dark>
    <router-link class="logo_w mr-4" :to="homePath">
      <img class="logo" src="@/assets/unicef.png" alt="logo">
    </router-link>

    <v-toolbar-items class="hidden-sm-and-down pl-4">
      <v-btn
        flat
        v-if="isAuthenticated && isAdmin && (isAdminPath || isNotFoundAdminPath)"
        v-for="(item, key) in routesAdmin"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
      <v-btn
        flat
        v-if="isAuthenticated && isUnicefUser && (isClientPath || isNotFoundClientPath)"
        v-for="(item, key) in routesUnicefUser"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
      <v-btn
        flat
        v-if="isAuthenticated && isPartner && (isClientPath || isNotFoundClientPath)"
        v-for="(item, key) in routesPartner"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
      <v-btn
        flat
        v-if="isAuthenticated && isDonor && (isClientPath || isNotFoundClientPath)"
        v-for="(item, key) in routesDonor"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="right-nav">
      <v-chip class="hidden-sm-and-down user-name" v-if="isAuthenticated&&email" color="blue" :small="true">{{ email }}</v-chip>
      <v-spacer></v-spacer>
      <language-picker/>
      <v-spacer></v-spacer>
      <v-btn class="hidden-sm-and-down" @click="logOut" flat v-if="isAuthenticated">{{ $t('common.btns.logOut') }}</v-btn>
      <v-btn class="hidden-sm-and-down" @click="logIn" flat v-if="!isAuthenticated">{{ $t('common.btns.logIn') }}</v-btn>
      <v-btn class="hidden-md-and-up mobile-menu-btn" flat icon @click="toggleNavMenu">
        <svgicon class="svg-icon ml-1 mr-1" width="24" height="24" name="menu" color="#fff"/>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import store from '@/store';
  import LanguagePicker from '@/shared/components/LanguagePicker';
  import '@/../static/icons/compiled-svg/menu';

  export default {
    name: 'HeaderComponent',
    components: {
      LanguagePicker,
    },
    data() {
      return {
        email: localStorage.getItem('me') ? JSON.parse(localStorage.getItem('me')).email : '',
      };
    },
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
      homePath() {
        if (this.isAdminPath) {
          return '/admin';
        }
        if (this.isClientPath) {
          return '/dashboard';
        }
        return '/';
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
            link: '',
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
            link: '',
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
            link: '',
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
            link: '',
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
      toggleNavMenu() {
        this.$store.commit('global/toggleNavMenu', true);
      },
      logOut() {
        this.$store.dispatch('auth/auth/logOut');
        if (this.isAdminPath) {
          this.$router.push('/auth/login-admin');
        } else {
          this.$router.push('/auth/login');
        }
      },
      logIn() {
        this.$router.push('/auth/login');
      },
    },
  };
</script>

<style lang="scss" scoped>
.right-nav {
  display: flex;
  align-items: center;
  .v-menu {
    padding: 0 16px;
  }
}

.logo_w {
  width: 150px;

  .logo {
    display: block;
    width: 100%;
  }
}
</style>