
import { combineReducers } from 'redux';

import authReducer, { authState } from './authReducer';

export interface AppState {
    'authReducer': authState,
}

export default combineReducers({
    authReducer,
});