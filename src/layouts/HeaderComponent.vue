<template>
    <v-toolbar color="blue-grey" dark>
        <router-link class="logo_w" to="/">
            <img class="logo" src="../assets/unicef.png" alt="">
        </router-link>
        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn flat
                   v-for="(item, key) in menu"
                   :to="item.link"
                   :key="key">
                {{item.name}}
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
                menu: [
                    { name: 'Users', link: '/users' },
                    { name: 'Projects', link: '/projects' },
                    { name: 'Finance', link: '/finance' },
                    { name: 'Help', link: '/help' },
                    { name: 'Settings', link: '/settings' },
                    ],
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

    .logo_w {
        width: 200px;

        .logo {
            display: block;
            width: 100%;
        }
    }
</style>