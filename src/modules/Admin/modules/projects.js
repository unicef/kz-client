import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
    deleteProjectDialogState: false,
    terminateProjectDialogState: false,
    terminateProjectReasons: [],
};

const getters = {
  getDeleteProjectDialogState: state => state.deleteProjectDialogState,
  getTerminateProjectDialogState: state => state.terminateProjectDialogState,
  getTerminateProjectReasons: state => state.terminateProjectReasons,
};

const mutations = {
  toggleDeleteProjectDialogState(state, data) {
    state.deleteProjectDialogState = data;
  },
  toggleTerminateProjectDialogState(state, data) {
    state.terminateProjectDialogState = data;
  },
  setTerminateProjectReasons(state, data) {
    state.terminateProjectReasons = data;
  },
};

const actions = {
  async getTerminationReasons({ commit }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get('/admin/project/terminate/reasons', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setTerminateProjectReasons', data.data.data.reasons);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async deleteProject({ commit }, id) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const data = await axios.delete(`/admin/project?id=${id}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async terminateProject({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';

      const data = await axios.patch('/admin/project/terminate', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

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
