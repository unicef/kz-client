const UsersPage = () => import(/* webpackChunkName: "dashboard" */'./containers/UsersPage');
const CreateUnicef = () => import(/* webpackChunkName: "dashboard" */'./components/unicef/CreateUser');
const UsersTabs = () => import(/* webpackChunkName: "dashboard" */'./containers/UsersTabs');
export default {
    path: '/users',
    name: 'users',
    component: UsersPage,
    children: [
        {
            path: '',
            name: 'users-tabs',
            component: UsersTabs,
        },
        {
            path: 'unicef-create',
            name: 'unicef-create',
            component: CreateUnicef,
        },
    ],
};
