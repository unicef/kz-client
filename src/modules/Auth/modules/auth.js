import axios from '@/api/axiosInit';
import { JSONpath } from '@/shared/helpers/JSONpath';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token') || false,
};
const getters = {
  isAuthenticated: state => state.isAuthenticated,
};

const mutations = {
  setAuthenticated(state, data) {
    state.isAuthenticated = data;
  },
};

const actions = {
    async login({ commit, dispatch }, credentials) {
        try {
            const data = await axios.post('/user/login', JSON.stringify(credentials));

            return data;
        } catch (error) {
            return error.response;
        }
    },
    async register({ commit, dispatch }, credentials) {
      try {
        const data = await axios.post('/user/partner', JSON.stringify(credentials));

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async getMyInfo({ commit }) {
      try {
        const token = localStorage.getItem('token') || '';
        const data = await axios.get('/me', { headers: { Authorization: `Bearer ${token}` } });

        localStorage.setItem('me', JSON.stringify(data.data.data));
        await commit('global/setRoles', null, { root: true });
        commit('dashboard/profile/setShowSeed', data.data.data.showSeed, { root: true });
        commit('dashboard/profile/toggleShowSeedDialogState', data.data.data.showSeed, { root: true });
        commit('dashboard/profile/setShowForm', data.data.data.showForm, { root: true });
        if (data.data.data.seed) {
          commit('dashboard/profile/setSeed', data.data.data.seed, { root: true });
        } else {
          commit('dashboard/profile/setSeed', {}, { root: true });
        }

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async activate({ commit }, activation) {
      try {
        const lang = localStorage.getItem('language') || '';
        const data = await axios.post('/user/activation', JSON.stringify({ hash: activation.activation }), { headers: { Lang: lang } });

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async resendActivationLink({ commit }, link) {
      try {
        const lang = localStorage.getItem('language') || '';
        const data = await axios.post('/user/repeat-activation-link', JSON.stringify({ repeatHash: link }), { headers: { Lang: lang } });

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async setPassword({ commit }, setData) {
      try {
        const lang = localStorage.getItem('language') || '';
        const data = await axios.put('/user/password', JSON.stringify(setData), { headers: { Lang: lang } });

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async forgotPassword({ commit }, credentials) {
      try {
        const lang = localStorage.getItem('language') || '';
        const data = await axios.post('/user/forgot', JSON.stringify(credentials), { headers: { Lang: lang } });

        return data;
      } catch (error) {
        return error.response;
      }
    },
    logOut({ commit }) {
        localStorage.removeItem('token');
        commit('setAuthenticated', false);
        localStorage.removeItem('me');
        commit('global/setRoles', null, { root: true });
    },

};


export default {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
};
