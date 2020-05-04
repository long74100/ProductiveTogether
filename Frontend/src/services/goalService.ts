import moment from "moment-timezone";

import { axiosClient as axios } from './axiosClient';
import { Goal } from '../models/Goal';

import { PagedResult } from '../models/PagedResults';

export const getAllGoals = (): Promise<PagedResult<Goal>> => {
    return axios.get('/goals').then(res => res.data);
}

export const createDailyGoal = (userId: string) => {
    const userTimezone = moment.tz.guess();
    const date = moment().tz(userTimezone).format('YYYY-MM-DD');
    return axios.post('/goals', {
        userId,
        goalType: 0,
        date
    }).then(res => res.data);
}