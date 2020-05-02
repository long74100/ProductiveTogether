import { removeAccessTokens } from '../services/authService';
import { loadCurrentUser } from '../services/userService';
import { LOGIN_SUCCESS, AuthActionTypes } from '../actions/authActions';

/** Removes stale tokens from session storage */
loadCurrentUser().then().catch(
    error => removeAccessTokens()
);

export interface authState {
    loggedIn: boolean,
}

const initialState: authState = {
    loggedIn: sessionStorage.getItem('accessToken') !== null
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