import { axiosClient as axios } from './axiosClient';

/**
 * Removes access tokens from session storage.
 */
export const removeAccessTokens = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
}


/**
 * Gets the access token with the given username and password 
 * @param username username
 * @param password password
 */
export const getAccessToken = (username: string, password: string): Promise<any> => (
    axios.post('/Authenticate/login', {
        username,
        password
    }).then(res => res.data).catch(error => Promise.reject(error))
);