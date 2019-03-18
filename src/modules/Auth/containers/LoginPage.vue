<template>
    <v-layout justify-center column class='container'>
        <v-form  ref="form" @submit.prevent='submit' align-center justify-center lazy-validation>
            <v-card class="login-form">
                <v-toolbar class="headline justify-center" color="blue-grey">
                    Log in
                </v-toolbar>
                <v-container
                        :class='{ "pt-4": $vuetify.breakpoint.xs }'>


                    <v-card-text>
                        <v-container
                                grid-list-md
                                class='px-0 pb-0'
                                :class='{ "px-0": $vuetify.breakpoint.xs }'>
                            <v-layout row>
                                <v-flex sm12 >
                                    <v-text-field
                                            name='Email'
                                            label='Login'
                                            id='login'
                                            v-model='credentials.login'
                                            type='email'
                                            :rules="rules.login"
                                            required />
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex sm12>
                                    <v-text-field
                                            name='Password'
                                            label='Password'
                                            id='password'
                                            v-model='credentials.password'
                                            type='password'
                                            :rules="rules.password"
                                            required />
                                </v-flex>
                            </v-layout>
                            <!-- Alert -->
                            <v-layout row v-if='errorAlert.state'>
                                <v-flex sm12 >
                                    <v-alert :value="errorAlert.state" type="error">
                                        {{ errorAlert.msg }}
                                    </v-alert>
                                </v-flex>
                            </v-layout>

                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-layout align-center class="btns-wrapper">
                            <v-btn type='submit' color='info mb-2 mt-2' depressed>
                                Sign In
                            </v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-container>
            </v-card>
        </v-form>
    </v-layout>
</template>

<script>
//    import store from '@/store';

    export default {
        name: 'LoginPage',
//        async beforeRouteEnter(to, from, next) {
//            if (!localStorage.getItem('token')) {
//                store.commit('auth/auth/setAuthenticated', false);
//            }
//            if (store.getters['auth/auth/isAuthenticated']) {
//                next('/reports');
//            } else {
//                next();
//            }
//        },
        data() {
            return {
                credentials: {
                    login: '',
                    password: '',
                },
                rules: {
                    login: [
                        /* eslint-disable no-new */
                        v => !!v || 'Поле обязательное',
                        /* eslint-disable*/
                    ],
                    password: [
                        v => !!v || "Поле обязательное",
                    ],
                },
                errorAlert: {
                    state: false,
                    msg: '',
                },
            };
        },
    };
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
    }
    .login-form {
        max-width: 600px;
        margin: 0 auto;

        .btns-wrapper {
            justify-content: space-around;
            a {
                text-decoration: underline;

                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
    .headline {
        text-align: center;
        text-transform: uppercase;
        color: #fff;

        @media(max-width: 767px) {
            font-size: 18px !important;
        }
    }
</style>
