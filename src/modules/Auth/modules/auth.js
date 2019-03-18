import axios from '@/api/axiosInit';
import router from '@/router';

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
    logOut({ commit }) {
        localStorage.removeItem('token');
        commit('setAuthenticated', false);
        router.push('/');
    },

};


export default {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
};
