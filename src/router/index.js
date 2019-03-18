import Vue from 'vue';
import Router from 'vue-router';

import { routes as Auth } from '@/modules/Auth';
import { routes as Dashboard } from '@/modules/Dashboard';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/auth',
        },
    ],
});

router.addRoutes([
    Auth,
    Dashboard,
]);

export default router;
