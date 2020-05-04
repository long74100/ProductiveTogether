
import { combineReducers } from 'redux';

import authReducer, { AuthState } from './authReducer';

export interface AppState {
    'authReducer': AuthState,
}

export default combineReducers({
    authReducer,
});