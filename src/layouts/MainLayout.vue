<template>
    <v-layout class="m-container" column>

        <!-- Content -->
        <div
                class="content"
                :class='{ "pt": $vuetify.breakpoint.smAndDown }'>
            <slot />
        </div>

    </v-layout>
</template>

<script>

    export default {
        name: 'MainLayout',
        components: {
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
