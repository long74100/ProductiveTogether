import { Goal } from '../models/Goal';
import { LOAD_ALL_DAILY_GOALS, CREATE_DAILY_GOAL, UPDATE_ACTION_ITEM, CREATE_ACTION_ITEM, GoalActiontypes } from '../actions/goalActions';


export interface GoalState {
    dailyGoals: { [id: string]: Goal }
}

export const initialState: GoalState = {
    dailyGoals: {}
}

export default (state = initialState, action: GoalActiontypes) => {
    switch (action.type) {
        case LOAD_ALL_DAILY_GOALS:
            return {
                ...state,
                dailyGoals: { ...state.dailyGoals, ...action.payload }
            };
        case CREATE_DAILY_GOAL:
            return {
                ...state,
                dailyGoals: { ...state.dailyGoals, [action.payload.id]: action.payload }
            }
        case UPDATE_ACTION_ITEM:
            const actionItem = action.payload;
            const goal = state.dailyGoals[actionItem.goalId];

            return {
                ...state,
                dailyGoals: {
                    ...state.dailyGoals,
                    [goal.id]: { ...goal, actionItems: [...goal.actionItems.filter(ai => ai.id !== actionItem.id), actionItem] }
                }
            }
        case CREATE_ACTION_ITEM:
            const createdActionitem = action.payload;
            const goalForCreatedItem = state.dailyGoals[createdActionitem.goalId];

            return {
                ...state,
                dailyGoals: {
                    ...state.dailyGoals,
                    [goalForCreatedItem.id]: { ...goalForCreatedItem, actionItems: [...goalForCreatedItem.actionItems, createdActionitem] }
                }
            }
        default: return state
    }
}