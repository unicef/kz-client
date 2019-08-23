import axios from '@/api/axiosInit';

/* eslint-disable */
const initialState = {
  projectData: {
    id: null,
    titleRu: '',
    titleEn: '',
    programme: null,
    deadline: '',
    ice: null,
    usdRate: null,
    officer: null,
    section: null,
    descriptionRu: '',
    descriptionEn: '',
    createdAt: '',
    status: '',
    programme: {},
    projectCode: '',
  },
  projectProperties: {},
  projectDocumentsData: [],
  setIpDialogState: false,
  availablePartners: [],
};

const getters = {
  getProjectData: state => state.projectData,
  getProjectProperties: state => state.projectProperties,
  getProjectDocumentsData: state => state.projectDocumentsData,
  getSetIpDialogState: state => state.setIpDialogState,
  getAvailablePartners: state => state.availablePartners,
};

const mutations = {
  setProjectData(state, data) {
    // if no data to set (data === null) -> set all project data keys to empty values
    if (data) {
      state.projectData = data;
    } else {
      state.projectData = {
        id: null,
        titleRu: '',
        titleEn: '',
        programme: null,
        deadline: '',
        ice: null,
        usdRate: null,
        officer: null,
        section: null,
        descriptionRu: '',
        descriptionEn: '',
        createdAt: '',
        status: '',
        programme: {},
        projectCode: '',
      };
    }
  },
  setProjectProperties(state, data) {
    state.projectProperties = data;
  },
  setProjectDocumentsData(state, data) {
    state.projectDocumentsData = data;
  },
  deleteProjectDocument(state, id) {
    let newProjectDocumentsData = state.projectDocumentsData.filter((doc) => {
      return doc.id !== id;
    });
    state.projectDocumentsData = newProjectDocumentsData;
  },
  toggleSetIpDialogState(state, data) {
    state.setIpDialogState = data;
  },
  setAvailablePartners(state, data) {
    state.availablePartners = data;
  },
};

const actions = {
  async getProjectProperties({ commit }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get('/project/properties', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectProperties', data.data.data);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getProjectInfo({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectData', data.data.data.project);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async getProjectDocuments({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project/documents?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectDocumentsData', data.data.data);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async uploadDocument({ commit }, document) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post(`/project/document`, document, { headers: { Authorization: `Bearer ${token}`, Lang: lang, 'Content-Type': 'multipart/form-data' } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getProjectDocument({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project/document?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data.data;
    } catch (error) {
      return error.response;
    }
  },
  async deleteProjectDocument({ commit }, id) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.delete(`/project/document?id=${id}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async createProject({ commit }, project) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/project', project, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async editProject({ commit }, project) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/project', project, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getAvailablePartners({ commit }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get('/partner/available', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setAvailablePartners', data.data.data.partners);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async setIp({ commit }, ip) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/project/progress', ip, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectData', data.data.data.project);
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
