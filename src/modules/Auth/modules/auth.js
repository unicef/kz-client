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
            const data = await axios.post('/user/auth', JSON.stringify(credentials));

            return data;
        } catch (error) {
            return error.response;
        }
    },
    async register({ commit, dispatch }, credentials) {
      try {
        const data = await axios.post('/user/register', JSON.stringify(credentials));
        // const data = await axios.post('/register/partner', JSON.stringify(credentials));
        return data;
      } catch (error) {
        return error.response;
      }
    },
    async getMyInfo({ commit }) {
      try {
        // const token = localStorage.getItem('token') || '';
        // const data = await axios.get('/me', { headers: { Authorization: `Bearer ${token}` } });

        const data = await axios.get(`${JSONpath()}/meJSON.json`);
        localStorage.setItem('me', JSON.stringify(data.data.data));
        commit('global/setRoles', null, { root: true });

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async activate({ commit }, activation) {
      try {
        const lang = localStorage.getItem('language') || '';
        const data = await axios.post('/user/activate', JSON.stringify(activation), { headers: { Lang: lang } });

        return data;
      } catch (error) {
        return error.response;
      }
    },
    async setPassword({ commit }, setData) {
      try {
        const lang = localStorage.getItem('language') || '';
        const data = await axios.post('/user/set-password', JSON.stringify(setData), { headers: { Lang: lang } });

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
