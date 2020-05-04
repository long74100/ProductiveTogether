import { User } from '../models/User';
import { getCurrentUser } from '../services/userService';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

interface GetCurrentUserAction {
    type: typeof GET_CURRENT_USER
    payload: User
}

export type UserActionTypes = GetCurrentUserAction;

export const loadCurrentUser = () => (dispatch: any) => {
    return getCurrentUser().then(res => {
        dispatch({
            type: GET_CURRENT_USER,
            payload: res
        })
    })
}