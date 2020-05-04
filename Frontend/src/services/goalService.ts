import { axiosClient as axios } from './axiosClient';
import { Goal } from '../models/Goal';

import { PagedResult } from '../models/PagedResults';

export const getAllGoals = (): Promise<PagedResult<Goal>> => {
    return axios.get('/goals').then(res => res.data);
} 