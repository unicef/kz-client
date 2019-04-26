const AdminPage = () => import(/* webpackChunkName: "admin" */'./containers/AdminPage');
const UsersPage = () => import(/* webpackChunkName: "admin" */'./containers/UsersPage');
const UnicefUsersList = () => import(/* webpackChunkName: "admin" */'./components/UnicefUsersList');
const UnicefUserCreate = () => import(/* webpackChunkName: "admin" */'./components/UnicefUserCreate');
const UnicefUser = () => import(/* webpackChunkName: "admin" */'./components/UnicefUser');
const SettingsPage = () => import(/* webpackChunkName: "admin" */'./containers/SettingsPage');
const Localization = () => import(/* webpackChunkName: "admin" */'./components/settings/Localization');
const NotFound = () => import(/* webpackChunkName: "admin" */'@/shared/components/NotFound');

export default {
    path: '/admin',
    name: 'admin',
    redirect: { name: 'unicef-users-list' },
    component: AdminPage,
    children: [
        {
            path: 'users',
            component: UsersPage,
            redirect: { name: 'unicef-users-list' },
            children: [
                {
                    path: 'unicef-users-list',
                    name: 'unicef-users-list',
                    component: UnicefUsersList,
                },
                {
                    path: 'unicef-user-create',
                    name: 'unicef-user-create',
                    component: UnicefUserCreate,
                },
                {
                    path: 'unicef-user/:id',
                    component: UnicefUser,
                },
                {
                    path: 'partners-list',
                    name: 'partners-list',
                    component: UnicefUsersList,
                },
                {
                    path: 'donors-list',
                    name: 'donors-list',
                    component: UnicefUsersList,
                },
            ],
        },
        {
            path: 'settings',
            component: SettingsPage,
            redirect: { name: 'change-password' },
            children: [
                {
                    path: 'change-password',
                    name: 'change-password',
                    component: Localization,
                },
                {
                    path: 'localization',
                    name: 'localization',
                    component: Localization,
                },
            ],
        },
        {
          path: '*',
          name: 'not-found',
          component: NotFound,
        },
    ],
};
