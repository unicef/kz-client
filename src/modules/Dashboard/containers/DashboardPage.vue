<template>
	<dashboard-layout>
		<router-view />
	</dashboard-layout>
</template>

<script>
  import DashboardLayout from './../layouts/DashboardLayout';

  export default {
    name: 'DashboardPage',
    components: {
      DashboardLayout,
    },
  };
</script>

<style lang="scss" scoped>
</style>