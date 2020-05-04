import { axiosClient as axios } from './axiosClient';
import { Goal } from '../models/Goal';

export const getAllGoals = (): Promise<Goal[]> => {
    return axios.get('/goals').then(res => res.data);
} 