import axios from '@/api/axiosInit';

/* eslint-disable-next-line */
const initialState = {
  docs: [],
};

const getters = {
};

const mutations = {
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
