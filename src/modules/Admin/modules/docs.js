import axios from '@/api/axiosInit';

/* eslint-disable-next-line */
const initialState = {
  docs: {},
  doc: {},
};

const getters = {
  getDocs: state => state.docs,
  getDoc: state => state.doc,
};

const mutations = {
  setDocs(state, payload) {
    state.docs = payload;
  },
  setDoc(state, payload) {
    state.doc = payload;
  },
};

const actions = {
  async createPage({ commit }, pageObj) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.post('/admin/page',
        pageObj,
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
            Lang: lang,
          },
        });

      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  },
  async fetchDocs({ commit }, { page }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.get(`/admin/page/list?page=${page}`,
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
            Lang: lang,
          },
        });

      commit('setDocs', data.data);

      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  },
  async getDoc({ commit }, { id }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.get(`/admin/page?id=${id}`,
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
            Lang: lang,
          },
        });

      commit('setDoc', data.data);

      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  },
  async deleteDoc({ commit }, { id }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.delete(`/admin/page?id=${id}`,
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
            Lang: lang,
          },
        });

      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  },
};


export default {
  namespaced: true,
  modules: {
  },
  state: initialState,
  getters,
  actions,
  mutations,
};
