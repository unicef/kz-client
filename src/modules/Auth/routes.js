const AuthLayout = () => import(/* webpackChunkName: "auth" */'./layouts/AuthLayout');
const LoginPage = () => import(/* webpackChunkName: "auth" */'./containers/LoginPage');
const LoginAdminPage = () => import(/* webpackChunkName: "auth" */'./containers/LoginAdminPage');
const RegisterPage = () => import(/* webpackChunkName: "auth" */'./containers/RegisterPage');
const ActivateAccountPage = () => import(/* webpackChunkName: "auth" */'./containers/ActivateAccountPage');
const SetPasswordPage = () => import(/* webpackChunkName: "auth" */'./containers/SetPasswordPage');

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
        {
            path: 'login-admin',
            name: 'login-admin',
            component: LoginAdminPage,
        },
        {
            path: 'register',
            name: 'register',
            component: RegisterPage,
        },
        {
            path: 'activate-account',
            name: 'activate-account',
            component: ActivateAccountPage,
        },
        {
            path: 'set-password',
            name: 'set-password',
            component: SetPasswordPage,
        },
    ],

};
