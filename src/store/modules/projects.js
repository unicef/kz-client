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
    stage: {},
  },
  projectProperties: {},
  projectDocumentsData: [],
  setIpDialogState: false,
  availablePartners: [],
  projectsListData: {},
  projectInfoDialogState: false,
  projectInfo: {},
  projectLinks: [],
  projectHistory: [],
  projectTranches: [],
  faceRequestProperties: {},
  faceRequestActivities: {
    activities: [],
    total: {},
  },
  faceRequestData: {
    id: null,
    createdAt: '',
    approvedAt: '',
    statusId: '',
    dateFrom: '',
    dateTo: '',
    type: 1,
    successedAt: '',
    isCertify: false,
    isValid: false,
    isAuthorised: false,
    num: null,
    nextUser: null,
  },
  myRequestStageState: false,
  faceRequestDialogState: false,
  submittedFaceRequestData: null,
  faceRequestUsers: [],
};

const getters = {
  getProjectData: state => state.projectData,
  getProjectProperties: state => state.projectProperties,
  getProjectDocumentsData: state => state.projectDocumentsData,
  getSetIpDialogState: state => state.setIpDialogState,
  getAvailablePartners: state => state.availablePartners,
  getProjectsListData: state => state.projectsListData,
  getProjectInfoDialogState: state => state.projectInfoDialogState,
  getProjectInfo: state => state.projectInfo,
  getProjectLinks: state => state.projectLinks,
  getProjectHistory: state => state.projectHistory,
  getProjectTranches: state => state.projectTranches,
  getFaceRequestProperties: state => state.faceRequestProperties,
  getFaceRequestActivities: state => state.faceRequestActivities,
  getFaceRequestData: state => state.faceRequestData,
  getMyRequestStageState: state => state.myRequestStageState,
  getFaceRequestDialogState: state => state.faceRequestDialogState,
  getSubmittedFaceRequestData: state => state.submittedFaceRequestData,
  getFaceRequestUsers: state => state.faceRequestUsers,
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
        stage: {},
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
  setProjectsListData(state, data) {
    state.projectsListData = data;
  },
  toggleProjectInfoDialogState(state, data) {
    state.projectInfoDialogState = data;
  },
  setProjectInfo(state, data) {
    state.projectInfo = data;
  },
  setProjectLinks(state, data) {
    state.projectLinks = data;
  },
  setProjectHistory(state, data) {
    state.projectHistory = data;
  },
  setProjectTranches(state, data) {
    state.projectTranches = data;
  },
  setFaceRequestProperties(state, data) {
    state.faceRequestProperties = data;
  },
  setFaceRequestActivities(state, data) {
    state.faceRequestActivities = data;
    // if no data to set (data === null) -> set faceRequestActivities data keys to empty values
    if (data) {
      state.faceRequestActivities = data;
    } else {
      state.faceRequestActivities =  {
        activities: [],
        total: {},
      };
    }
  },
  setFaceRequestData(state, data) {
    // if no data to set (data === null) -> set all faceRequest data keys to empty values
    if (data) {
      state.faceRequestData = data;
    } else {
      state.faceRequestData = {
        id: null,
        createdAt: '',
        approvedAt: '',
        statusId: '',
        dateFrom: '',
        dateTo: '',
        type: 1,
        successedAt: '',
        isCertify: false,
        isValid: false,
        isAuthorised: false,
        num: null,
        nextUser: null,
      };
    }
  },
  setMyRequestStageState(state, data) {
    state.myRequestStageState = data;
  },
  toggleFaceRequestDialogState(state, data) {
    state.faceRequestDialogState = data;
  },
  setSubmittedFaceRequestData(state, data) {
    state.submittedFaceRequestData = data;
  },
  setSubmittedFaceRequestDataField(state, data) {
    state.submittedFaceRequestData[data.fieldKey] = data.fieldValue;
  },
  setFaceRequestUsers(state, data) {
    state.faceRequestUsers = data;
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
  async getProjectShortInfo({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project/short?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectInfo', data.data.data.project);
      commit('setMyRequestStageState', data.data.data.project.isMyStage);

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
  async fetchProjectsListData({ commit } , credentials ) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const search = credentials.search ? encodeURIComponent(credentials.search) : '';
      const page = credentials.page ? credentials.page : '';
      let url;
      switch (credentials.type) {
        case 'all':
          url = `/project/list?page=${page}&search=${search}`;
          break;
        case 'my':
          url = `/project/my-list?page=${page}&search=${search}`;
          break;
        case 'company':
          url = `/partner/projects?page=${page}&search=${search}&id=${credentials.companyId}`;
          break;
      
        default:
          url = `/project/my-list?page=${page}&search=${search}`;
          break;
      }
      const data = await axios.get(url,  { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      const projectsListData = data.data.data;

      commit('setProjectsListData', projectsListData);
      return projectsListData;
    } catch (err) {
      /* eslint-disable */
      console.log(err);
      return err.response;
    }
  },
  async getProjectLinks({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project/links?projectId=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectLinks', data.data.data.links);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async addProjectLink({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/project/link', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getProjectHistory({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project/history?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectHistory', data.data.data.history);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getProjectHistoryDocument({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project/history-file?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data.data;
    } catch (error) {
      return error.response;
    }
  },
  async getProjectTranches({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/project/tranches?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setProjectTranches', data.data.data.tranches);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getFaceRequestProperties({ commit }) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get('/request/properties', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setFaceRequestProperties', data.data.data);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getFaceRequestActivities({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/request/activities?projectId=${credentials.projectId}&requestId=${credentials.requestId}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setFaceRequestActivities', data.data.data);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async getFaceRequestData({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get(`/request?id=${credentials}`, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setFaceRequestData', data.data.data.request);
      commit('setMyRequestStageState', data.data.data.isMyStage);

      return data.data.data;
    } catch (error) {
      return error.response;
    }
  },
  async getFaceRequestUsers({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.get('/request/users', { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      commit('setFaceRequestUsers', data.data.data.users);

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async createFaceRequest({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/request', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async createFaceRequestAfterReject({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.put('/request', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

      return data;
    } catch (error) {
      return error.response;
    }
  },
  async approveFaceRequest({ commit }, credentials) {
    try {
      const token = localStorage.getItem('token') || '';
      const lang = localStorage.getItem('language') || '';
      const data = await axios.post('/request/approve', credentials, { headers: { Authorization: `Bearer ${token}`, Lang: lang } });

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
