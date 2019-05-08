<template>
  <main-layout>
    <v-container fluid class='main-layout px-0 py-0'>
      <!-- Header -->
      <header-component></header-component>
      <v-layout align-content-space-between>

        <v-layout justify-center class='dashboard'>
          <v-flex 
            xs12 xl12>
            <!-- Content -->
            <slot />
          </v-flex>
        </v-layout>
      </v-layout>
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
    name: 'DashboardLayout',
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
.dashboard {
  @media (max-width: 959px) {
    padding-top: 4px !important;
  }
}
</style>