import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
    deleteProjectDialogState: false,
};

const getters = {
  getDeleteProjectDialogState: state => state.deleteProjectDialogState,
};

const mutations = {
  toggleDeleteProjectDialogState(state, data) {
    state.deleteProjectDialogState = data;
  },
};

const actions = {
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
