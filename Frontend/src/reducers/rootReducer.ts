
import { combineReducers } from 'redux';

import authReducer, { AuthState } from './authReducer';
import goalReducer, { GoalState } from './goalReducer';
import modalReducer, { ModalState } from './modalReducer';
import userReducer, { UserState } from './userReducer';

export interface AppState {
    'authReducer': AuthState,
    'modalReducer': ModalState,
    'goalReducer': GoalState,
    'userReducer': UserState
}

export default combineReducers({
    authReducer,
    modalReducer,
    goalReducer,
    userReducer
});