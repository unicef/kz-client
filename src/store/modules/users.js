import axios from '@/api/axiosInit';
import { JSONpath } from '@/shared/helpers/JSONpath';

/* eslint-disable */
const initialState = {
  // userData: {},
  userData: {
    email: '',
    id: null,
    firstNameRu: '',
    firstNameEn: '',
    lastNameRu: '',
    lastNameEn: '',
    occupationRu: '',
    occupationEn: '',
    role: {},
    tel: '',
    mobile: '',
    company: {},
    createdAt: '',
    lastLogin: '',
    status: '',
  },
  authorisedPersonData: {},
  partnerCompanyProperties: {},
  companyData: {
    id: null,
    nameRu: '',
    nameEn: '',
    tradeNameEn: '',
    tradeNameRu: '',
    license: '',
    ceoNameRu: '',
    ceoNameEn: '',
    ceoLastNameRu: '',
    ceoLastNameEn: '',
    country: {},
    establishmentYear: '',
    employers: '',
    areaOfWork: {},
    ownership: {},
    partnerType: {},
    csoType: {},
    tel: '',
    website: '',
    cityRu: '',
    cityEn: '',
    addressRu: '',
    addressEn: '',
    zip: '',
    createdAt: '',
    assistId: null,
    status: '',
  },
  companyFieldsDisabled: false,
  companyDocumentsData: [],
  deleteDocumentDialogState: false,
  deleteDocumentId: null,
};

const getters = {
  getUserData: state => state.userData,
  getAuthorisedPersonData: state => state.authorisedPersonData,
  getCompanyData: state => state.companyData,
  getPartnerCompanyProperties: state => state.partnerCompanyProperties,
  getCompanyFieldsDisabled: state => state.companyFieldsDisabled,
  getCompanyDocumentsData: state => state.companyDocumentsData,
  getDeleteDocumentDialogState: state => state.deleteDocumentDialogState,
  getDeleteDocumentId: state => state.deleteDocumentId,
};

const mutations = {
  setUserData(state, data) {
    // if no data to set (data === null) -> set all user data keys to empty values
    if (data) {
      state.userData = data;
    } else {
      state.userData = {
        email: '',
        id: null,
        firstNameRu: '',
        firstNameEn: '',
        lastNameRu: '',
        lastNameEn: '',
        occupationRu: '',
        occupationEn: '',
        role: {},
        tel: '',
        mobile: '',
        company: {},
        createdAt: '',
        lastLogin: '',
        status: '',
      };
    }

  },
  setAuthorisedPersonData(state, data) {
    state.authorisedPersonData = data;
  },
  setCompanyData(state, data) {
    // if no data to set (data === null) -> set all company data keys to empty values
    if (data) {
      state.companyData = data;
    } else {
      state.companyData = {
        id: null,
        nameRu: '',
        nameEn: '',
        tradeNameEn: '',
        tradeNameRu: '',
        license: '',
        ceoNameRu: '',
        ceoNameEn: '',
        ceoLastNameRu: '',
        ceoLastNameEn: '',
        country: {},
        establishmentYear: '',
        employers: '',
        areaOfWork: {},
        ownership: {},
        partnerType: {},
        csoType: {},
        tel: '',
        website: '',
        cityRu: '',
        cityEn: '',
        addressRu: '',
        addressEn: '',
        zip: '',
        createdAt: '',
        assistId: null,
        status: '',
      };
    }

  },
  setPartnerCompanyProperties(state, data) {
    state.partnerCompanyProperties = data;
  },
  toggleCompanyFieldsDisabled(state, data) {
    state.companyFieldsDisabled = data;
  },
  setCompanyDocumentsData(state, data) {
    state.companyDocumentsData = data;
  },
  toggleDeleteDocumentDialogState(state, data) {
    state.deleteDocumentDialogState = data;
  },
  setDeleteDocumentId(state, data) {
    state.deleteDocumentId = data;
  },
  deleteCompanyDocument(state, id) {
    let newCompanyDocumentsData = state.companyDocumentsData.filter((doc) => {
      return doc.id !== id;
    });
    state.companyDocumentsData = newCompanyDocumentsData;
  },
};

const actions = {
  async getUserInfo({ commit }, credentials) {
    try {
      // const token = localStorage.getItem('token') || '';
      //   const lang = localStorage.getItem('language') || '';
      // const data = await axios.get(`/user?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const data = await axios.get(`${JSONpath()}/user${credentials}JSON.json`);
      commit('setUserData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async getAuthorisedPersonInfo({ commit }, credentials) {
    try {
      // const token = localStorage.getItem('token') || '';
      //   const lang = localStorage.getItem('language') || '';
      // const data = await axios.get(`/user?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const data = await axios.get(`${JSONpath()}/user${credentials}JSON.json`);
      commit('setAuthorisedPersonData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async getPartnerCompanyProperties({ commit }, credentials) {
    try {
      // const token = localStorage.getItem('token') || '';
      //   const lang = localStorage.getItem('language') || '';
      // const data = await axios.get('/partner/properties', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const data = await axios.get(`${JSONpath()}/partnerCompanyInfoJSON.json`);
      commit('setPartnerCompanyProperties', data.data.data);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getCompanyInfo({ commit }, credentials) {
    try {
      // const token = localStorage.getItem('token') || '';
      //   const lang = localStorage.getItem('language') || '';
      // const data = await axios.get(`/company?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const data = await axios.get(`${JSONpath()}/company${credentials}JSON.json`);
      commit('setCompanyData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async getCompanyDocuments({ commit }, credentials) {
    try {
      // const token = localStorage.getItem('token') || '';
      //   const lang = localStorage.getItem('language') || '';
      // const data = await axios.get(`/company/documents?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const data = await axios.get(`${JSONpath()}/company${credentials}documentsJSON.json`);
      commit('setCompanyDocumentsData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  deleteCompanyDocument({ commit }, id) {
    try {
      // const token = localStorage.getItem('token') || '';
      // const lang = localStorage.getItem('language') || '';
      // const data = await axios.post(`/company/documents?id=${id}`, { id }, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });


      // return data;
      return {
        data: {
          success: true,
        }
      }
      // return {
      //   data: {
      //     err: "something went wrong",
      //   }
      // }
    } catch (error) {
      return error.response;
    }
  },
  async uploadDocument({ commit }, document) {
    try {
      // const token = localStorage.getItem('token') || '';
      // const lang = localStorage.getItem('language') || '';
      // const data = await axios.post(`/company/upload`, document, { headers: { Authorization: `Bearer ${token}`, Lang: lang, 'Content-Type': 'multipart/form-data' } });


      // return data;
      return {
        data: {
          success: true,
          data: {
            id: '1',
          }
        }
      }
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
