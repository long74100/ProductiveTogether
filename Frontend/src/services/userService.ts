import { axiosClient as axios } from './axiosClient';

/** Gets current user, also checks that an access token is still valid by making a request */
export const loadCurrentUser = () => axios.get('/Authenticate/me/');

export const register = (
    username: string,
    emailAddress: string,
    firstName: string,
    lastName: string,
    password: string,
): Promise<any> => {
    return axios.post('/users', {
        username, emailAddress, firstName, lastName, password
    }).then(res => {
        console.log(res);
    })
}