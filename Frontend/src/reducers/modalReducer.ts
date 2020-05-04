import { OPEN_MODAL, ModalActionTypes, ModalType, CLOSE_MODAL } from '../actions/modalActions';


export interface ModalState {
    isOpen: boolean,
    type: ModalType,
    props: any
}

const initialState: ModalState = {
    isOpen: false,
    type: ModalType.Closed,
    props: {}
}

export default (state = initialState, action: ModalActionTypes) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                type: action.modalType,
                props: action.modalProps
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                type: ModalType.Closed,
                props: {}
            }
        default: return state
    }
}