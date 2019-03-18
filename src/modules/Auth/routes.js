const AuthLayout = () => import(/* webpackChunkName: "auth" */'./layouts/AuthLayout');
const LoginPage = () => import(/* webpackChunkName: "auth" */'./containers/LoginPage');

/* eslint-disable */
export default {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: AuthLayout,
    children: [
        {
            path: 'login',
            name: 'login',
            component: LoginPage,
        },
    ],

};
