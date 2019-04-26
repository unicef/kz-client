<template>
    <main-layout>
        <!-- Header -->
        <header-component></header-component>
        <router-view />
        <!-- Footer -->
        <footer-component />
        <!-- Nav menu for mobile -->
        <nav-menu /> 
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
</style>
