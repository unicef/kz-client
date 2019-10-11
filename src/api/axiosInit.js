import axios from 'axios';
import store from '@/store';

const instance = axios.create({
    /* eslint-disable */
    baseURL: process.env.ROOT_API,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Lang': localStorage.getItem('language') || 'en',
    },
});

instance.interceptors.response.use(null, (error) => {
    if ((error.response.data.error.status === 401 && error.response.data.error.errorCode === 214) || (error.response.data.error.status === 401 && error.response.data.error.errorCode === 215) || (error.response.data.error.status === 403 && error.response.data.error.errorCode === 141)) {
        store.dispatch('auth/auth/logOut', true);
    }
    if ((error.response.data.error.status === 403 && error.response.data.error.errorCode === 131)) {
        store.dispatch('auth/auth/getMyInfo');
    }
    return Promise.reject(error);
});

export default instance;

