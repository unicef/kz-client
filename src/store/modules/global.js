import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
  navMenu: false,
  locale: {},
  languages: [],
  roles: ['a', 'ro'],
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
  setRoles(state, data) {
    state.roles = data;
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
