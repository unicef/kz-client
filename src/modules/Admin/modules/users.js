import axios from '@/api/axiosInit';
import { JSONpath } from '@/shared/helpers/JSONpath';

/* eslint-disable */
const initialState = {
    partnersListData: {},
};

const getters = {
  getPartnersListData: state => state.partnersListData,
};

const mutations = {
  setPartnersListData(state, data) {
    state.partnersListData = data;
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
