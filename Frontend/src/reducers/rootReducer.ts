
import { combineReducers } from 'redux';

import authReducer, { AuthState } from './authReducer';
import modalReducer, { ModalState } from './modalReducer';

export interface AppState {
    'authReducer': AuthState,
    'modalReducer': ModalState
}

export default combineReducers({
    authReducer,
    modalReducer
});