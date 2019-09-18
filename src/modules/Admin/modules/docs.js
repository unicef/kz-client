import axios from '@/api/axiosInit';

/* eslint-disable-next-line */
const initialState = {
  docs: {},

  titleEN: '',
  titleRU: '',
  URL: '',
  textEN: '',
  textRU: '',
  public: true,
};

const getters = {
  getDocs: state => state.docs,

  getTitleEN: state => state.titleEN,
  getTitleRU: state => state.titleRU,
  getURL: state => state.URL,
  getTextEN: state => state.textEN,
  getTextRU: state => state.textRU,
  getPublic: state => state.public,

  collectDocData: state => ({
    key: state.URL,
    titleEn: state.titleEN,
    titleRu: state.titleRU,
    textEn: state.textEN,
    textRu: state.textRU,
    isPublic: state.public,
  }),
};

const mutations = {
  setDocs(state, payload) {
    state.docs = payload;
  },

  setTitleEN(state, payload) {
    state.titleEN = payload;
  },
  setTitleRU(state, payload) {
    state.titleRU = payload;
  },
  setURL(state, payload) {
    state.URL = payload;
  },
  setTextEN(state, payload) {
    state.textEN = payload;
  },
  setTextRU(state, payload) {
    state.textRU = payload;
  },
  setPublic(state, payload) {
    state.public = payload;
  },
  clearDocData(state) {
    state.titleEN = '';
    state.titleRU = '';
    state.URL = '';
    state.textEN = '';
    state.textRU = '';
    state.public = true;
  },
};

const actions = {
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
  async createDoc({ getters: storeGetters }) {
    const docData = storeGetters.collectDocData;

    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.post('/admin/page',
        docData,
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

      const { isPublic, key, textEn, textRu, titleEn, titleRu } = data.data;

      commit('setPublic', isPublic);
      commit('setURL', key);
      commit('setTextEN', textEn);
      commit('setTextRU', textRu);
      commit('setTitleEN', titleEn);
      commit('setTitleRU', titleRu);

      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  },
  async updateDoc({ getters: storeGetters, commit }, { id }) {
    const docData = storeGetters.collectDocData;
    docData.id = id;

    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const { data } = await axios.put('/admin/page',
        docData,
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
