const DashboardPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DashboardPage');
const ProfilePage = () => import(/* webpackChunkName: "dashboard" */'./containers/ProfilePage');
const UserDetailsForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/UserDetailsForm');
const CompanyDetailsForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/CompanyDetailsForm');
const UserSettings = () => import(/* webpackChunkName: "dashboard" */'./components/profile/UserSettings');
const CompanyDocumentsForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/CompanyDocumentsForm');
const ProjectsPage = () => import(/* webpackChunkName: "dashboard" */'./containers/ProjectsPage');
const MyProjects = () => import(/* webpackChunkName: "dashboard" */'./components/projects/MyProjects');
const AllProjects = () => import(/* webpackChunkName: "dashboard" */'./components/projects/AllProjects');
const ProjectForm = () => import(/* webpackChunkName: "dashboard" */'@/shared/components/ProjectForm');
const PartnersPage = () => import(/* webpackChunkName: "dashboard" */'./containers/PartnersPage');
const PartnersList = () => import(/* webpackChunkName: "dashboard" */'./components/partners/PartnersList');
const PartnerPage = () => import(/* webpackChunkName: "dashboard" */'./containers/PartnerPage');
const CompanyInfo = () => import(/* webpackChunkName: "dashboard" */'./components/partners/CompanyInfo');
const CompanyUsers = () => import(/* webpackChunkName: "dashboard" */'./components/partners/CompanyUsers');
const CompanyDocuments = () => import(/* webpackChunkName: "dashboard" */'./components/partners/CompanyDocuments');
const CompanyProjects = () => import(/* webpackChunkName: "dashboard" */'./components/partners/CompanyProjects');
const UserForm = () => import(/* webpackChunkName: "dashboard" */'./components/profile/UserForm');
const NotFound = () => import(/* webpackChunkName: "admin" */'@/shared/components/NotFound');

// dev Pages
const DocsPage = () => import(/* webpackChunkName: "dashboard" */'./containers/DocsPage');
const DocsList = () => import(/* webpackChunkName: "dashboard" */'./components/docs/DocsList');
const DocDetails = () => import(/* webpackChunkName: "dashboard" */'./components/docs/DocDetails');

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
        path: 'projects',
        component: ProjectsPage,
        redirect: { name: 'my-projects' },
        children: [
            {
              path: 'my-projects',
              name: 'my-projects',
              component: MyProjects,
            },
            {
              path: 'all-projects',
              name: 'all-projects',
              component: AllProjects,
            },
            {
              path: 'create-project',
              name: 'create-project',
              component: ProjectForm,
            },
            {
              path: 'project/:id',
              component: ProjectForm,
            },
        ],
      },
      {
        path: 'partners',
        component: PartnersPage,
        redirect: { name: 'all-partners' },
        children: [
            {
              path: '/',
              name: 'all-partners',
              component: PartnersList,
            },
            {
              path: ':partnerId',
              component: PartnerPage,
              redirect: { name: 'company-info' },
              children: [
                  {
                    path: 'company-info',
                    name: 'company-info',
                    component: CompanyInfo,
                  },
                  {
                    path: 'company-users',
                    name: 'company-users',
                    component: CompanyUsers,
                  },
                  {
                    path: 'company-documents',
                    name: 'company-documents',
                    component: CompanyDocuments,
                  },
                  {
                    path: 'company-projects',
                    name: 'company-projects',
                    component: CompanyProjects,
                  },
              ],
            },
        ],
      },
      {
        path: 'docs',
        component: DocsPage,
        children: [
          {
              path: '',
              name: 'documents-list',
              component: DocsList,
          },
          {
              path: ':slug',
              name: 'document-details',
              component: DocDetails,
          },
        ],
      },
      {
        path: '*',
        name: 'not-found-page',
        component: NotFound,
      },
    ],
};
