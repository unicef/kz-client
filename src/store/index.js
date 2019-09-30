import Vue from 'vue';
import Vuex from 'vuex';

import { store as admin } from '@/modules/Admin';
import { store as auth } from '@/modules/Auth';
import { store as dashboard } from '@/modules/Dashboard';
import global from './modules/global';
import users from './modules/users';
import projects from './modules/projects';
import finance from './modules/finance';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        admin,
        auth,
        dashboard,
        global,
        users,
        projects,
        finance,
    },
    strict: process.env.NODE_ENV !== 'production',
});
