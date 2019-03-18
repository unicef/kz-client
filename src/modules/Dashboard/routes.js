const DashboardPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DashboardPage');
export default {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    component: DashboardPage,
    children: [],
};
