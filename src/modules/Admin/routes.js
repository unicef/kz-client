const AdminPage = () => import(/* webpackChunkName: "admin" */'./containers/AdminPage');
const UsersPage = () => import(/* webpackChunkName: "admin" */'./containers/UsersPage');
const UnicefUsersList = () => import(/* webpackChunkName: "admin" */'./components/users/UnicefUsersList');
const UnicefUserForm = () => import(/* webpackChunkName: "admin" */'./components/users/UnicefUserForm');
const PartnersList = () => import(/* webpackChunkName: "admin" */'./components/users/PartnersList');
const PartnerFullForm = () => import(/* webpackChunkName: "admin" */'./components/users/PartnerFullForm');
const DonorsList = () => import(/* webpackChunkName: "admin" */'./components/users/DonorsList');
const DonorForm = () => import(/* webpackChunkName: "admin" */'./components/users/DonorForm');
const SettingsPage = () => import(/* webpackChunkName: "admin" */'./containers/SettingsPage');
const ProjectsPage = () => import(/* webpackChunkName: "admin" */'./containers/ProjectsPage');
const AllProjects = () => import(/* webpackChunkName: "admin" */'./components/projects/ProjectsList');
const ProjectForm = () => import(/* webpackChunkName: "dashboard" */'@/shared/components/ProjectForm');
const Localization = () => import(/* webpackChunkName: "admin" */'./components/settings/Localization');
const PasswordSettings = () => import(/* webpackChunkName: "admin" */'./components/settings/PasswordSettings');
const FinancePage = () => import(/* webpackChunkName: "admin" */'./containers/FinancePage');
const TransactionsList = () => import(/* webpackChunkName: "admin" */'@/shared/components/TransactionsList');
const NotFound = () => import(/* webpackChunkName: "admin" */'@/shared/components/NotFound');

// dev Pages
const DocsPage = () => import(/* webpackChunkName: "admin" */'./containers/DocsPage');
const DocsList = () => import(/* webpackChunkName: "admin" */'./components/docs/DocsList');
const CreatePage = () => import(/* webpackChunkName: "admin" */'./components/docs/CreatePage');
const EditPage = () => import(/* webpackChunkName: "admin" */'./components/docs/EditPage');

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
                    component: UnicefUserForm,
                },
                {
                    path: 'unicef-user/:id',
                    component: UnicefUserForm,
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
                    component: DonorsList,
                },
                {
                    path: 'donor-create',
                    name: 'donor-create',
                    component: DonorForm,
                },
                {
                    path: 'donor/:id',
                    component: DonorForm,
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
                    component: PasswordSettings,
                },
                {
                    path: 'localization',
                    name: 'localization',
                    component: Localization,
                },
            ],
        },
        {
            path: 'projects',
            component: ProjectsPage,
            redirect: { name: 'projects' },
            children: [
                {
                    path: 'all-projects',
                    name: 'projects',
                    component: AllProjects,
                },
                {
                    path: 'project/:id',
                    component: ProjectForm,
                },
                {
                    path: 'create-project',
                    name: 'create-new-project',
                    component: ProjectForm,
                },
            ],
        },
        {
            path: 'docs',
            component: DocsPage,
            children: [
                {
                    path: '',
                    name: 'docs-list',
                    component: DocsList,
                },
                {
                    path: 'create',
                    name: 'create-page',
                    component: CreatePage,
                },
                {
                    path: 'edit/:id',
                    name: 'edit-page',
                    component: EditPage,
                },
            ],
        },
        {
            path: 'finance',
            component: FinancePage,
            redirect: { name: 'transactions-list' },
            children: [
              {
                  path: '',
                  name: 'transactions-list',
                  component: TransactionsList,
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
