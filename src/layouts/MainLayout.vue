<template>
    <v-layout class="m-container" column>
        <header-component></header-component>
        <!-- Content -->
        <div
                class="content"
                :class='{ "pt": $vuetify.breakpoint.smAndDown }'>
            <slot />
        </div>

    </v-layout>
</template>

<script>
    import HeaderComponent from './HeaderComponent';

    export default {
        name: 'MainLayout',
        components: {
            HeaderComponent,
        },
    };
</script>

<style lang="scss" scoped>
    .m-container {
        height: 100%;
    }

    .content {
        flex: 1 0 auto;
    }
</style>
