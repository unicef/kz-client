const DashboardPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DashboardPage');
const UsersPage = () => import(/* webpackChunkName: "dashboard" */'./containers/UsersPage');
const CreateUnicef = () => import(/* webpackChunkName: "dashboard" */'./components/unicef/CreateUser');
const EditUnicef = () => import(/* webpackChunkName: "dashboard" */'./components/unicef/EditUser');
const UsersTabs = () => import(/* webpackChunkName: "dashboard" */'./containers/UsersTabs');
const DocsPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DocsPage');
const NotFound = () => import(/* webpackChunkName: "admin" */'@/shared/components/NotFound');

export default {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    redirect: { name: 'users-tabs' },
    children: [
      {
        path: 'users',
        component: UsersPage,
        children: [
            {
                path: '',
                name: 'users-tabs',
                component: UsersTabs,
            },
            {
                path: 'user/:id',
                props: true,
                component: EditUnicef,
            },
            {
                path: 'unicef-create',
                name: 'unicef-create',
                component: CreateUnicef,
            },
        ],
      },
      {
        path: 'docs/:page',
        name: 'docs',
        component: DocsPage,
      },
      {
        path: '*',
        name: 'not-found-page',
        component: NotFound,
      },
    ],
};
