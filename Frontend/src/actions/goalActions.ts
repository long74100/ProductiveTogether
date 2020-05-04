import { Goal } from '../models/Goal';
import { getAllGoals } from '../services/goalService';
import { normalizeData } from '../helper';
import { PagedResult } from '../models/PagedResults';

export const LOAD_ALL_DAILY_GOALS = 'LOAD_ALL_DAILY_GOALS';

interface LoadAllDailyGoalsAction {
    type: typeof LOAD_ALL_DAILY_GOALS,
    payload: { [id: string]: Goal }
}

export type GoalActiontypes = LoadAllDailyGoalsAction

export const loadAllDailyGoals = () => (dispatch: any) => {
    return getAllGoals().then((res: PagedResult<Goal>) => {
        const normalizedData = normalizeData(res.items);

        dispatch({
            type: LOAD_ALL_DAILY_GOALS,
            payload: normalizedData
        })

        return res.items;
    })

}