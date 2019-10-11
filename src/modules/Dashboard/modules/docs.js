import axios from '@/api/axiosInit';

const initialState = {
  documents: [],
  document: {},
};

const getters = {
  getDocuments: state => state.documents,
  getDocument: state => state.document,
};

const mutations = {
  setDocuments(state, payload) {
    state.documents = payload;
  },
  setDocument(state, payload) {
    state.document = payload;
  },
};

const actions = {
  async fetchDocuments({ commit }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.get('/page/list',
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
            Lang: lang,
          },
        });

      const { pages } = data.data;
      commit('setDocuments', pages);

      return data;
    } catch (err) {
      const { data } = err.response;
      return data;
    }
  },
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

      return data;
    } catch (err) {
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
