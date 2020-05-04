
import { combineReducers } from 'redux';

import authReducer, { AuthState } from './authReducer';
import goalReducer, { GoalState } from './goalReducer';
import modalReducer, { ModalState } from './modalReducer';

export interface AppState {
    'authReducer': AuthState,
    'modalReducer': ModalState,
    'goalReducer': GoalState
}

export default combineReducers({
    authReducer,
    modalReducer,
    goalReducer
});