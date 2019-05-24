const DashboardPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DashboardPage');
const ProfilePage = () => import(/* webpackChunkName: "dashboard" */'./containers/ProfilePage');
const UserDetailsForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/UserDetailsForm');
const CompanyDetailsForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/CompanyDetailsForm');
const UserSettings = () => import(/* webpackChunkName: "dashboard" */'./components/profile/UserSettings');
const CompanyDocumentsForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/CompanyDocumentsForm');
const UserForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/UserForm');
const DocsPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DocsPage');
const NotFound = () => import(/* webpackChunkName: "admin" */'@/shared/components/NotFound');

export default {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    redirect: { name: 'user-details' },
    children: [
      {
        path: 'profile',
        component: ProfilePage,
        redirect: { name: 'user-details' },
        children: [
            {
                path: 'user-details',
                name: 'user-details',
                component: UserDetailsForm,
            },
            {
              path: 'company-details',
              name: 'company-details',
              component: CompanyDetailsForm,
            },
            {
                path: 'settings',
                name: 'user-settings',
                component: UserSettings,
            },
            {
                path: 'documents',
                name: 'documents',
                component: CompanyDocumentsForm,
            },
            {
              path: 'user-form',
              name: 'user-form',
              component: UserForm,
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
