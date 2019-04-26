import Vue from 'vue';
import Vuex from 'vuex';

import { store as admin } from '@/modules/Admin';
import { store as auth } from '@/modules/Auth';
import { store as dashboard } from '@/modules/Dashboard';
import global from './modules/global';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        admin,
        auth,
        dashboard,
        global,
    },
    strict: process.env.NODE_ENV !== 'production',
});
