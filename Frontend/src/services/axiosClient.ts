import axios from 'axios';

import history from '../history';

/** Wraps axios to include auth header for requests  */
export const axiosClient = (() => {
    const defaultOptions = {
        baseURL: 'http://127.0.0.1:8000/api/v1',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('accessToken');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    instance.interceptors.response.use(resp => resp, error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            const refreshToken = sessionStorage.getItem('refreshToken');
            if (!originalRequest._retry && refreshToken) {
                originalRequest._retry = true;

                const refreshToken = sessionStorage['refreshToken'];
                return axios.post(`${defaultOptions.baseURL}/token/refresh/`, {
                    "refresh": refreshToken
                }).then(res => {
                    const accessToken = res.data['access'];
                    sessionStorage.setItem('accessToken', accessToken);
                    originalRequest.headers.Authorization = 'Bearer ' + accessToken;
                    return axios(originalRequest);
                }).catch(error => {
                    window.location.reload();
                    return Promise.reject(error);
                })
            }

            if (!refreshToken || originalRequest.url.includes('/token/')) {
                // todo: check on history vs window reload
                history.push('/login');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);;
    });

    (instance as any).CancelToken = axios.CancelToken;
    (instance as any).isCancel = axios.isCancel;

    return instance;
})();
