import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
  showSeedDialogState: false,
  seed: {},
  showSeed: false,
  showForm: false,
};

const getters = {
  getShowSeedDialogState: state => state.showSeedDialogState,
  showSeed: state => state.showSeed,
  showForm: state => state.showForm,
  seed: state => state.seed,
};

const mutations = {
  toggleShowSeedDialogState(state, data) {
    state.showSeedDialogState = data;
  },
  setShowSeed(state, data) {
    state.showSeed = data;
  },
  setShowForm(state, data) {
    state.showForm = data;
  },
  setSeed(state, data) {
    state.seed = data;
  },
};

const actions = {
  async changeSeedState({ commit }) {
    try {
      const token = localStorage.getItem('token') || '';
      const data = await axios.patch('/user/seed', null, { headers: { Authorization: `Bearer ${token}` } });


      return data;
    //   return {
    //     data: {
    //       success: true,
    //     }
    //   }
      // return {
      //   data: {
      //     err: "something went wrong",
      //   }
      // }
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
