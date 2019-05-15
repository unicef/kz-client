const AdminPage = () => import(/* webpackChunkName: "admin" */'./containers/AdminPage');
const UsersPage = () => import(/* webpackChunkName: "admin" */'./containers/UsersPage');
const UnicefUsersList = () => import(/* webpackChunkName: "admin" */'./components/users/UnicefUsersList');
const UnicefUserCreate = () => import(/* webpackChunkName: "admin" */'./components/users/UnicefUserCreate');
const UnicefUser = () => import(/* webpackChunkName: "admin" */'./components/users/UnicefUser');
const PartnersList = () => import(/* webpackChunkName: "admin" */'./components/users/PartnersList');
const PartnerFullForm = () => import(/* webpackChunkName: "admin" */'./components/users/PartnerFullForm');
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
                    component: PartnersList,
                },
                {
                    path: 'partner-create',
                    name: 'partner-create',
                    component: PartnerFullForm,
                },
                {
                    path: 'partner/:id',
                    component: PartnerFullForm,
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
