import { Goal } from '../models/Goal';
import { getAllGoals, createDailyGoal } from '../services/goalService';
import { normalizeData } from '../helper';
import { PagedResult } from '../models/PagedResults';

export const LOAD_ALL_DAILY_GOALS = 'LOAD_ALL_DAILY_GOALS';
export const CREATE_DAILY_GOAL = 'CREATE_DAILY_GOAL';

interface LoadAllDailyGoalsAction {
    type: typeof LOAD_ALL_DAILY_GOALS,
    payload: { [id: string]: Goal }
}

interface CreateDailyGoalAction {
    type: typeof CREATE_DAILY_GOAL,
    payload: Goal
}

export type GoalActiontypes = LoadAllDailyGoalsAction & CreateDailyGoalAction;

export const loadAllDailyGoals = () => (dispatch: any) => {
    return getAllGoals().then((res: PagedResult<Goal>) => {
        const normalizedData = normalizeData(res.items);

        dispatch({
            type: LOAD_ALL_DAILY_GOALS,
            payload: normalizedData
        });

        return res.items;
    });
}

export const createDailyGoalForUser = (userId: string) => (dispatch: any) => {
    return createDailyGoal(userId).then((res: Goal) => {
        dispatch({
            type: CREATE_DAILY_GOAL,
            payload: res
        });

        return res;
    })
}