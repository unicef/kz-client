<template>
	<admin-layout>
		<router-view />
	</admin-layout>
</template>

<script>
  import AdminLayout from './../layouts/AdminLayout';

  export default {
    name: 'AdminPage',
    components: {
      AdminLayout,
    },
  };
</script>

<style lang="scss" scoped>
</style>