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
  /* eslint-disable */
  async fetchDocument({ commit }, { slug }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.get(`/page?key=${slug}`,
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
            Lang: lang,
          },
        });
      
      const { page } = data.data;
      commit('setDocument', page);

      // if (!data.page) {
      //   commit('toggleErrorAlert', true);
      //   commit('setDocument', {});
      //   return;
      // }
      // commit('setDocument', data.page);
      // commit('setCurrentPage', page);
      return data;
    } catch (err) {
      // commit('toggleErrorAlert', true);
      // commit('setDocument', '');
      const { data } = err.response;
      return data;
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
