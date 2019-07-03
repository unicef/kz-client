import axios from '@/api/axiosInit';
import { JSONpath } from '@/shared/helpers/JSONpath';

/* eslint-disable */
const initialState = {
    partnersListData: {},
    unicefUserProperties: {},
};

const getters = {
  getPartnersListData: state => state.partnersListData,
  getUnicefUserProperties: state => state.unicefUserProperties,
};

const mutations = {
  setPartnersListData(state, data) {
    state.partnersListData = data;
  },
  setUnicefUserProperties(state, data) {
    state.unicefUserProperties = data;
  },
};

const actions = {
  async fetchPartnersListData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const search = credentials.search ? credentials.search : '';
      const page = credentials.page ? credentials.page : '';
      const data = await axios.get(`/admin/partner/list?page=${page}&search=${search}`,  { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const partnersListData = data.data.data;

      commit('setPartnersListData', partnersListData);
      return partnersListData;
    } catch (err) {
      /* eslint-disable */
      console.log(err);
      return err.response;
    }
  },
  async getUnicefUserProperties({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get('/admin/unicef/properties', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setUnicefUserProperties', data.data.data);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async createUnicefUserByAdmin({ commit }, unicefUser) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/admin/unicef', unicefUser, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async editUnicefUserByAdmin({ commit }, unicefUser) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/admin/unicef', unicefUser, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

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
