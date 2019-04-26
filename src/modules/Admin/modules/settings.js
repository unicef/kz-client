import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
  keyTranslations: {},
};

const getters = {
  getKeyTranslationsState: state => state.keyTranslations,
};

const mutations = {
  setKeyTranslations(state, data) {
    state.keyTranslations = data;
  },
  setKeyTranslation(state, data) {
      console.log(data);
    state.keyTranslations[data.key] = data.value;
  },
  clearKeyTranslations(state) {
    Object.keys(state.keyTranslations).forEach((key) => {
      state.keyTranslations[key] = '';
    });
  }
};

const actions = {
  async saveTranslations({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const data = await axios.post('/phrase', JSON.stringify(credentials), { headers: { Authorization: `Bearer ${token}` } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getTranslations({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const data = await axios.get(`/phrase?key=${credentials}`, { headers: { Authorization: `Bearer ${token}` } });

       return data;
    } catch (error) {
      return error.response;
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
