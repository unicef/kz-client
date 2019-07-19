import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
    partnersListData: {},
    partnerInfo: {
      id: null,
      name: '',
      address: '',
      areasOfWork: '',
      ceoFirstName: '',
      ceoLastName: '',
      city: '',
      country: '',
      createdAt: '',
      csoType: '',
      employersCount: null,
      establishmentYear: null,
      license: '',
      ownership: '',
      partnerType: '',
      statusId: '',
      tel: '',
      tradeName: '',
      website: '',
      zip: '',
      assistant: {},
      authorised: {},
      projects: [],
    },
};

const getters = {
  getPartnersListData: state => state.partnersListData,
  getPartnerInfo: state => state.partnerInfo,
};

const mutations = {
  setPartnersListData(state, data) {
    state.partnersListData = data;
  },
  setPartnerInfo(state, data) {
    // if no data to set (data === null) -> set all partner info data keys to empty values
    if (data) {
      state.partnerInfo = data;
    } else {
      state.partnerInfo = {
        id: null,
        name: '',
        address: '',
        areasOfWork: '',
        ceoFirstName: '',
        ceoLastName: '',
        city: '',
        country: '',
        createdAt: '',
        csoType: '',
        employersCount: null,
        establishmentYear: null,
        license: '',
        ownership: '',
        partnerType: '',
        statusId: '',
        tel: '',
        tradeName: '',
        website: '',
        zip: '',
        assistant: {},
        authorised: {},
        projects: [],
      }
    }
  },
  setPartnerInfoField(state, data) {
    state.partnerInfo[data.field] = data.value;
  },
};

const actions = {
  async fetchPartnersListData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const search = credentials.search ? encodeURIComponent(credentials.search) : '';
      const page = credentials.page ? credentials.page : '';
      const data = await axios.get(`/partner/list?page=${page}&search=${search}`,  { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const partnersListData = data.data.data;

      commit('setPartnersListData', partnersListData);
      return partnersListData;
    } catch (err) {
      /* eslint-disable */
      console.log(err);
      return err.response;
    }
  },
  async fetchPartnerInfoData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/partner/details?id=${credentials}`,  { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const partnerInfoData = data.data;

      commit('setPartnerInfo', partnerInfoData.data);
      return partnerInfoData;
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
