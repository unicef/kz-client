<template>
  <v-toolbar color="light-blue" dark>
    <router-link class="logo_w mr-4" :to="homePath">
      <img class="logo" src="@/assets/unicef.png" alt="logo">
    </router-link>

    <v-toolbar-items class="hidden-sm-and-down pl-4">
      <v-btn
        flat
        v-if="isAuthenticated && isAdmin && isAdminPath"
        v-for="(item, key) in routesAdmin"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
      <v-btn
        flat
        v-if="isAuthenticated && isUnicefUser && isClientPath"
        v-for="(item, key) in routesUnicefUser"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
      <v-btn
        flat
        v-if="isAuthenticated && isPartner && isClientPath"
        v-for="(item, key) in routesPartner"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
      <v-btn
        flat
        v-if="isAuthenticated && isDonor && isClientPath"
        v-for="(item, key) in routesDonor"
        :to="item.link"
        :key="key"
      >{{item.title}}</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="right-nav">
      <v-chip class="hidden-sm-and-down user-name" v-if="isAuthenticated" color="blue" :small="true">testtesttest@test.test</v-chip>
      <v-spacer></v-spacer>
      <language-picker/>
      <v-spacer></v-spacer>
      <v-btn class="hidden-sm-and-down" @click="logOut" flat v-if="isAuthenticated">Log out</v-btn>
      <v-btn class="hidden-sm-and-down" @click="logIn" flat v-if="!isAuthenticated">Log in</v-btn>
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
        routesAdmin: [
          {
            title: 'Users',
            link: '/admin/users',
          },
          {
            title: 'Projects',
            link: '',
          },
          {
            title: 'Finance',
            link: '',
          },
          {
            title: 'Help',
            link: '',
          },
          {
            title: 'Settings',
            link: '/admin/settings',
          },
        ],
        routesUnicefUserAll: [
          {
            title: 'Profile',
            link: '/dashboard/profile',
          },
          {
            title: 'Projects',
            link: '',
          },
          {
            title: 'Finance',
            link: '',
          },
          {
            title: 'Help',
            link: '',
          },
          {
            title: 'Parners',
            link: '',
          },
        ],
        routesPartnerAll: [
          {
            title: 'Profile',
            link: '/dashboard/profile',
          },
          {
            title: 'Projects',
            link: '',
          },
          {
            title: 'Finance',
            link: '',
          },
          {
            title: 'Help',
            link: '',
          },
        ],
        routesDonorAll: [
          {
            title: 'Profile',
            link: '/dashboard/profile',
          },
          {
            title: 'My Projects',
            link: '',
          },
          {
            title: 'Finance',
            link: '',
          },
          {
            title: 'Help',
            link: '',
          },
        ],
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
        return this.$store.getters['auth/auth/showForm'];
      },
      routesPartner() {
        /* eslint-disable */
        if (this.showStepByStepForm) {
          return this.routesPartnerAll.filter((item) => {
            return item.title === 'Profile';
          });
        }
        return this.routesPartnerAll;
      },
      routesUnicefUser() {
        if (this.showStepByStepForm) {
          return this.routesUnicefUserAll.filter((item) => {
            return item.title === 'Profile';
          });
        }
        return this.routesUnicefUserAll;
      },
      routesDonor() {
        if (this.showStepByStepForm) {
          return this.routesDonorAll.filter((item) => {
            return item.title === 'Profile';
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
  width: 200px;

  .logo {
    display: block;
    width: 100%;
  }
}
</style>