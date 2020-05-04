export enum ModalType {
    Closed = 'CLOSED',
    CreateGoal = 'CREATE_GOAL'
}

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

interface OpenModalAction {
    type: typeof OPEN_MODAL
    modalType: ModalType,
    modalProps: any
}

interface CloseModalAction {
    type: typeof CLOSE_MODAL
}

export type ModalActionTypes = OpenModalAction & CloseModalAction;

export const openModal = (modalType: ModalType, props: any) => (dispatch: any) => {
    return dispatch({
        type: OPEN_MODAL,
        modalType: modalType,
        modalProps: props
    })
};

export const closeModal = () => (dispatch: any) => {
    return dispatch({
        type: CLOSE_MODAL
    });
}