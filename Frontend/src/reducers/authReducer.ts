import { LOGIN_SUCCESS, AuthActionTypes } from '../actions/authActions';


export interface AuthState {
    loggedIn: boolean,
}

const initialState: AuthState = {
    loggedIn: false
}

export default (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true
            }
        default: return state
    }
}