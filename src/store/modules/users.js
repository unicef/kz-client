import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
  userData: {
    email: '',
    id: null,
    companyRu: '',
    companyEn: '',
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
    country: null,
    establishmentYear: '',
    employers: '',
    areaOfWork: null,
    ownership: null,
    partnerType: null,
    csoType: null,
    tel: '',
    website: '',
    cityRu: '',
    cityEn: '',
    addressRu: '',
    addressEn: '',
    zip: '',
    createdAt: '',
    assistId: null,
    statusId: '',
  },
  companyFieldsDisabled: false,
  companyDocumentsData: [],
  deleteDocumentDialogState: false,
  deleteDocumentId: null,
  rejectCompanyDialogState: false,
  rejectedCompany: null,
  approveCompanyDialogState: false,
  approvedCompany: null,
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
  getRejectCompanyDialogState: state => state.rejectCompanyDialogState,
  getRejectedCompany: state => state.rejectedCompany,
  getApproveCompanyDialogState: state => state.approveCompanyDialogState,
  getApprovedCompany: state => state.approvedCompany,
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
        companyRu: '',
        companyEn: '',
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
        country: null,
        establishmentYear: '',
        employers: '',
        areaOfWork: null,
        ownership: null,
        partnerType: null,
        csoType: null,
        tel: '',
        website: '',
        cityRu: '',
        cityEn: '',
        addressRu: '',
        addressEn: '',
        zip: '',
        createdAt: '',
        assistId: null,
        statusId: '',
      };
    }

  },
  setCompanyDataField(state, data) {
    state.companyData[data.field] = data.value;
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
  toggleRejectCompanyDialogState(state, data) {
    state.rejectCompanyDialogState = data;
  },
  setRejectedCompany(state, data) {
    state.rejectedCompany = data;
  },
  toggleApproveCompanyDialogState(state, data) {
    state.approveCompanyDialogState = data;
  },
  setApprovedCompany(state, data) {
    state.approvedCompany = data;
  },
};

const actions = {
  async getUserInfo({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/user?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setUserData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async saveUserDetails({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/user/information', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getAuthorisedPersonInfo({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/user?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setAuthorisedPersonData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async getPartnerCompanyProperties({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get('/partner/properties', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setPartnerCompanyProperties', data.data.data);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getCompanyInfo({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/partner?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setCompanyData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async saveCompanyDetails({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/partner', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getCompanyDocuments({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/partner/documents?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setCompanyDocumentsData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async saveCompanyDocuments({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/partner/documents', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getCompanyDocument({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/partner/document?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data.data;
    } catch (error) {
      return error.response;
    }
  },
  async deleteCompanyDocument({ commit }, id) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.delete(`/partner/document?id=${id}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async uploadDocument({ commit }, document) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post(`/partner/document`, document, { headers: { Authorization: `Bearer ${token}`, Lang: lang, 'Content-Type': 'multipart/form-data' } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async createPartnerByAdmin({ commit }, partner) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/admin/partner', partner, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async editPartnerByAdmin({ commit }, partner) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/admin/partner', partner, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async saveUserStepByStep({ commit }, userInfo) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/user/info/step', userInfo, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async changeUserPassword({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.patch('/user/password', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async rejectCompany({ commit }, rejectCompanyData) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.patch('/partner/reject', rejectCompanyData, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async approveCompany({ commit }, approveCompanyData) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.patch('/partner/approve', approveCompanyData, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
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
