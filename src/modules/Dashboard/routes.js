const DashboardPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DashboardPage');
export default {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    children: [],
};
