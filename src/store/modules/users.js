import axios from '@/api/axiosInit';
import { JSONpath } from '@/shared/helpers/JSONpath';

/* eslint-disable */
const initialState = {
  userData: {},
  partnerCompanyProperties: {},
};

const getters = {
  getUserData: state => state.userData,
  getPartnerCompanyProperties: state => state.partnerCompanyProperties,
};

const mutations = {
  setUserData(state, data) {
    state.userData = data;
  },
  setPartnerCompanyProperties(state, data) {
    state.partnerCompanyProperties = data;
  },
};

const actions = {
  async getUserInfo({ commit }, credentials) {
    try {
      // const token = localStorage.getItem('token') || '';
      //   const lang = localStorage.getItem('language') || '';
      // const data = await axios.get(`/user?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const data = await axios.get(`${JSONpath()}/user${credentials}JSON.json`);
      commit('setUserData', data.data.data);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getPartnerCompanyProperties({ commit }, credentials) {
    try {
      // const token = localStorage.getItem('token') || '';
      //   const lang = localStorage.getItem('language') || '';
      // const data = await axios.get('/partner/properties', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const data = await axios.get(`${JSONpath()}/partnerCompanyInfoJSON.json`);
      commit('setPartnerCompanyProperties', data.data.data);

      return data;
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
