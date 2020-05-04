import { Goal } from '../models/Goal';
import { getAllGoals } from '../services/goalService';
import { normalizeData } from '../helper';

export const LOAD_ALL_DAILY_GOALS = 'LOAD_ALL_DAILY_GOALS';

interface LoadAllDailyGoalsAction {
    type: typeof LOAD_ALL_DAILY_GOALS,
    payload: { [id: string]: Goal }
}

export type GoalActiontypes = LoadAllDailyGoalsAction

export const loadAllDailyGoals = () => (dispatch: any) => {
    return getAllGoals().then((dailyGoals: Goal[]) => {

        const normalizedData = normalizeData(dailyGoals);

        dispatch({
            type: LOAD_ALL_DAILY_GOALS,
            payload: normalizedData
        })

        return dailyGoals;
    })

}