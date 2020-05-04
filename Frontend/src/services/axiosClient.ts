import axios from 'axios';

import history from '../history';

/** Wraps axios to include auth header for requests  */
export const axiosClient = (() => {
    const defaultOptions = {
        // In production this would be from env
        baseURL: 'https://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "true"
        },
    };

    const instance = axios.create(defaultOptions);

    // Set auth header for all requests
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

                const accessToken = sessionStorage.getItem('accessToken');
                const refreshToken = sessionStorage['refreshToken'];
                return axios.post(`${defaultOptions.baseURL}/Authenticate/refresh`, {
                    'token': accessToken,
                    'refreshToken': refreshToken
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

            if (!refreshToken || originalRequest.url.includes('/Authenticate/')) {
                // todo: check on history vs window reload
                if (!window.location.href.includes('/login')) {
                    window.location.reload();
                }
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);;
    });

    (instance as any).CancelToken = axios.CancelToken;
    (instance as any).isCancel = axios.isCancel;

    return instance;
})();
