<template>
    <main-layout>
      <v-container fluid class='main-layout px-0 py-0'>
        <!-- Header -->
        <header-component></header-component>
        <router-view />
        <!-- Footer -->
        <footer-component />
        <!-- Nav menu for mobile -->
        <nav-menu />
      </v-container>
    </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/MainLayout';
  import HeaderComponent from '@/shared/components/HeaderComponent';
  import NavMenu from '@/shared/components/NavMenu';
  import FooterComponent from '@/shared/components/FooterComponent';

  export default {
    name: 'AuthLayout',
    components: {
      MainLayout,
      HeaderComponent,
      NavMenu,
      FooterComponent,
    },
  };
</script>

<style lang="scss">
.container.main-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
