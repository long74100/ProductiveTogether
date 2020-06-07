import { Goal, ActionItem } from '../models/Goal';
import { getAllGoals, createDailyGoal } from '../services/goalService';
import { putActionItem, postActionItem } from '../services/actionItemService';
import { normalizeData } from '../helper';
import { PagedResult } from '../models/PagedResults';

export const LOAD_ALL_DAILY_GOALS = 'LOAD_ALL_DAILY_GOALS';
export const CREATE_DAILY_GOAL = 'CREATE_DAILY_GOAL';
export const UPDATE_ACTION_ITEM = 'UPDATE_ACTION_ITEM';
export const CREATE_ACTION_ITEM = 'CREATE_ACTION_ITEM';

interface LoadAllDailyGoalsAction {
    type: typeof LOAD_ALL_DAILY_GOALS,
    payload: { [id: string]: Goal }
}

interface CreateDailyGoalAction {
    type: typeof CREATE_DAILY_GOAL,
    payload: Goal
}

interface UpdateActionItemAction {
    type: typeof UPDATE_ACTION_ITEM,
    payload: ActionItem
}

interface CreateActionItemAction {
    type: typeof CREATE_ACTION_ITEM,
    payload: ActionItem
}

export type GoalActiontypes = LoadAllDailyGoalsAction & CreateDailyGoalAction & UpdateActionItemAction & CreateActionItemAction;

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

export const createActionItem = (actionItem: Partial<ActionItem>) => (dispatch: any) => {
    return postActionItem(actionItem).then((res: ActionItem) => {
        dispatch({
            type: CREATE_ACTION_ITEM,
            payload: res
        });

        return res;
    })
}

export const updateActionItem = (actionItem: ActionItem) => (dispatch: any) => {
    return putActionItem(actionItem).then((res: ActionItem) => {
        dispatch({
            type: UPDATE_ACTION_ITEM,
            payload: actionItem
        });

        return res;
    });
}

