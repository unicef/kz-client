<template>
    <v-toolbar color="blue-grey" dark>
        <div class="logo">
            Logo
        </div>
        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn flat v-for="(item, key) in menu" :key="key">
                {{item}}
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items class="right-nav">
            <v-chip color="grey" :small="true">
                <v-avatar>
                    <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="user">
                </v-avatar>
                John Doe
            </v-chip>
            <v-spacer></v-spacer>
            <v-select
                    :items="languages"
                    label="Language"
                    :value="en"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn flat>
                Log out
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>
    import store from '@/store';

    export default {
        data() {
            return {
                menu: ['Users', 'Projects', 'Finance', 'Help', 'Settings'],
                languages: ['en', 'ru'],
            };
        },
        computed: {
            isAutorised() {
                return store.getters['auth/auth/isAuthenticated'];
            },
        },
    };
</script>

<style lang="scss" scoped>
    .right-nav {
        display: flex;
        align-items: center;
    }
</style>