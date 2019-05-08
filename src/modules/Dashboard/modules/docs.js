import axios from '@/api/axiosInit';

const initialState = {
  document: {},
  currentPage: null,
  errorAlert: null,
};

const getters = {
  getDocument: state => state.document,
  getCurrentPage: state => state.currentPage,
  getErrorAlert: state => state.errorAlert,
};

const mutations = {
  setDocument(state, document) {
    state.document = document;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
  toggleErrorAlert(state, alert) {
    state.errorAlert = alert;
  },
};

const actions = {
  async fetchDocumentData({ commit }, page) {
    commit('toggleErrorAlert', false);

    try {
      const lang = localStorage.getItem('language');
      const { data } = await axios.post('/page', { lang, keyword: page });

      if (!data.page) {
        commit('toggleErrorAlert', true);
        commit('setDocument', {});
        return;
      }
      commit('setDocument', data.page);
      commit('setCurrentPage', page);

      /* eslint-disable */
      return data;
    } catch (err) {
      commit('toggleErrorAlert', true);
      commit('setDocument', '');
      /* eslint-disable */
      return err.response;
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
