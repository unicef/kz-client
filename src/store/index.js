import Vue from 'vue';
import Vuex from 'vuex';

import { store as auth } from '@/modules/Auth';
import { store as dashboard } from '@/modules/Dashboard';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        dashboard,
    },
    strict: process.env.NODE_ENV !== 'production',
});
