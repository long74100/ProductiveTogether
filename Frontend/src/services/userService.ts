import { axiosClient as axios } from './axiosClient';

import { User } from '../models/User';

/** Gets current user, also checks that an access token is still valid by making a request */
export const getCurrentUser = (): Promise<User> => axios.get('/Authenticate/me/').then(res => res.data);

export const register = (
    username: string,
    emailAddress: string,
    firstName: string,
    lastName: string,
    password: string,
): Promise<User> => {
    return axios.post('/users', {
        username, emailAddress, firstName, lastName, password
    }).then(res => res.data);
}

/**
 * Gets a list of all users
 */
export const getAllUsers = (): Promise<User[]> => {
    return axios.get('/users').then(res => res.data);
}

/**
 * Gets a user by id
 * @param id id of the user
 */
export const getUserById = (id: string): Promise<User> => {
    return axios.get(`/users/${id}`).then(res => res.data);
}