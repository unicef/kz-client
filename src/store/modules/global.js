import axios from '@/api/axiosInit';
import CryptoJS from 'crypto-js';

/* eslint-disable */
const initialState = {
  navMenu: false,
  locale: {},
  languages: [],
  roles: [],
};

const getters = {
  getNavMenuState: state => state.navMenu,
  getLocale: state => state.locale,
  getLanguages: state => state.languages,
  getRoles: state => state.roles,
};

const mutations = {
  toggleNavMenu(state, menuState) {
    state.navMenu = menuState;
  },
  setLocale(state, data) {
    state.locale[data.lang] = data.data;
  },
  setLanguages(state, data) {
    state.languages = data;
  },
  setRoles(state) {
    const myInfo = localStorage.getItem('me');
    if (myInfo) {
      const myInfoData = JSON.parse(myInfo);
      let rolesArr = [];
      // Decrypt roles
      myInfoData.role.forEach((role) => {
        const bytes  = CryptoJS.AES.decrypt(role, myInfoData.id + myInfoData.createdAt);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        rolesArr.push(plaintext);
      });
      // Store roles at state
      state.roles = rolesArr;
    } else {
      state.roles = [];
    }
  },
};

const actions = {
  async fetchLocaleData({ commit }, credentials) {
    try {
      const data = await axios.post('/translate', JSON.stringify({ lang: credentials.lang }));
      const localeData = data.data.trans_data;

      commit('setLocale', { lang: credentials.lang, data: localeData});
      return localeData;
    } catch (error) {
      return error.response;
    }
  },
  async fetchLanguagesData({ commit }) {
    try {
      const data = await axios.get('/languages');
      const languagesData = data.data.data;

      commit('setLanguages', languagesData);
      let langObj = {};
      Object.keys(languagesData).forEach((key) => {
        langObj[key] = '';
        commit('admin/settings/setKeyTranslations', langObj, { root: true });
      });
      return languagesData;
    } catch (error) {
      return error.response;
    }
  },
};


export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
