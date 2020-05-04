import { axiosClient as axios } from './axiosClient';
import { Goal } from '../models/Goal';

export const getAllGoals = (): Promise<Array<Goal>> => {
    return axios.get('/goals').then(res => res.data);
} 