import axios from 'axios';
// import router from '@/router';

const instance = axios.create({
    /* eslint-disable */
    baseURL: process.env.ROOT_API,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Lang': localStorage.getItem('language') || 'en',
    },
});

// instance.interceptors.response.use(null, (error) => {
//     if (error.response.status === 401) {
//         localStorage.removeItem('token');
//         router.push('/auth');
//     }
//     return Promise.reject(error);
// });

export default instance;

