import { Goal } from '../models/Goal';
import { LOAD_ALL_DAILY_GOALS, GoalActiontypes } from '../actions/goalActions';


export interface GoalState {
    dailyGoals: { [id: string]: Goal }
}

const initialState: GoalState = {
    dailyGoals: {}
}

export default (state = initialState, action: GoalActiontypes) => {
    switch (action.type) {
        case LOAD_ALL_DAILY_GOALS:
            return {
                ...state,
                dailyGoals: { ...state.dailyGoals, ...action.payload }
            };
        default: return state
    }
}