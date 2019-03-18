import Vue from 'vue';

import VeeValidate from 'vee-validate';

import './plugins/vuetify';
import App from './App';
import router from './router';

import store from './store';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
