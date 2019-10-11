import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
  transactionsListData: {},
};

const getters = {
  getTransactionsListData: state => state.transactionsListData,
};

const mutations = {
  setTransactionsListData(state, data) {
    state.transactionsListData = data;
  },
};

const actions = {
  async fetchTransactionsListData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const search = credentials.search ? encodeURIComponent(credentials.search) : '';
      const page = credentials.page ? credentials.page : '';
      const data = await axios.get(`/transaction/list?page=${page}&search=${search}`,  { headers: { Authorization: `Bearer ${token}`, Lang: lang } });
    
      const transactionsListData = data.data.data;
    
      commit('setTransactionsListData', transactionsListData);
      return transactionsListData;
    } catch (err) {
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
