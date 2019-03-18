<template>
    <main-layout>
        <router-view />
    </main-layout>
</template>

<script>
    import MainLayout from '@/layouts/MainLayout';

    export default {
        name: 'AuthLayout',
        components: {
            MainLayout,
        },
    };
</script>

<style lang="scss">
</style>
