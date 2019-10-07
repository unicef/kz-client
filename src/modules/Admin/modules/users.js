import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
    partnersListData: {},
    unicefUsersListData: {},
    donorsListData: {},
    unicefUserProperties: {},
    blockUserDialogState: false,
    blockDonorDialogState: false,
    blockedUser: null,
    changeAdminRoleDialogState: false,
};

const getters = {
  getPartnersListData: state => state.partnersListData,
  getUnicefUsersListData: state => state.unicefUsersListData,
  getDonorsListData: state => state.donorsListData,
  getUnicefUserProperties: state => state.unicefUserProperties,
  getBlockUserDialogState: state => state.blockUserDialogState,
  getBlockDonorDialogState: state => state.blockDonorDialogState,
  getBlockedUser: state => state.blockedUser,
  getChangeAdminRoleDialogState: state => state.changeAdminRoleDialogState,
};

const mutations = {
  setPartnersListData(state, data) {
    state.partnersListData = data;
  },
  setUnicefUsersListData(state, data) {
    state.unicefUsersListData = data;
  },
  setDonorsListData(state, data) {
    state.donorsListData = data;
  },
  setUnicefUserProperties(state, data) {
    state.unicefUserProperties = data;
  },
  toggleBlockUserDialogState(state, data) {
    state.blockUserDialogState = data;
  },
  toggleBlockDonorDialogState(state, data) {
    state.blockDonorDialogState = data;
  },
  setBlockedUser(state, data) {
    state.blockedUser = data;
  },
  toggleChangeAdminRoleDialogState(state, data) {
    state.changeAdminRoleDialogState = data;
  },
};

const actions = {
  async fetchPartnersListData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const search = credentials.search ? encodeURIComponent(credentials.search) : '';
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
  async fetchUnicefUsersListData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const search = credentials.search ? encodeURIComponent(credentials.search) : '';
      const page = credentials.page ? credentials.page : '';
      const data = await axios.get(`/admin/unicef/list?page=${page}&search=${search}`,  { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const unicefUsersListData = data.data.data;

      commit('setUnicefUsersListData', unicefUsersListData);
      return unicefUsersListData;
    } catch (err) {
      /* eslint-disable */
      console.log(err);
      return err.response;
    }
  },
  async fetchDonorsListData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const search = credentials.search ? encodeURIComponent(credentials.search) : '';
      const page = credentials.page ? credentials.page : '';
      const data = await axios.get(`/admin/donor/list?page=${page}&search=${search}`,  { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const donorsListData = data.data.data;

      commit('setDonorsListData', donorsListData);
      return donorsListData;
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
  async createDonorByAdmin({ commit }, donor) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/admin/donor', donor, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async editDonorByAdmin({ commit }, donor) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/admin/donor', donor, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async blockUser({ commit }, blockUserData) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const url = blockUserData.type === 'unicef' ? '/admin/unicef/block' : '/admin/partner/block';
      const data = await axios.patch(`${url}`, blockUserData.user, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async blockDonor({ commit }, blockDonorData) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.patch('/admin/donor/block', blockDonorData, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async changeAdminRole({ commit }, adminRoleCredentials) {
    console.log(adminRoleCredentials);
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const requestUrl = adminRoleCredentials.isAdmin ? '/admin/unicef/unmake-admin' : '/admin/unicef/make-admin';
      const data = await axios.patch(requestUrl, adminRoleCredentials.user, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

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
