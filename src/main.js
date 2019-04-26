import Vue from 'vue';

import VueSVGIcon from 'vue-svgicon';
import VeeValidate from 'vee-validate';

import './plugins/vuetify';
import App from './App';
import router from './router';
import { i18n, setLanguage } from './i18n';

import store from './store';

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(VueSVGIcon);

/* eslint-disable no-new */
setLanguage()
  .then(() => {
    new Vue({
        el: '#app',
        router,
        store,
        i18n,
        render: h => h(App),
    });
  });
