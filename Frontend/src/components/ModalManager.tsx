import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { default as ReactModal } from 'react-modal';

import { AppState } from '../reducers/rootReducer';
import { closeModal, ModalType } from '../actions/modalActions';
import { Modal } from 'react-bootstrap';
import Kanban from './Kanban';

const mapStateToProps = (state: AppState) => (state.modalReducer);

const mapDispatchToProps = (dispatch: any) => ({
    closeModal: () => dispatch(closeModal())
});

type StateProps = {
    isOpen: boolean,
    type: ModalType,
    props: any,
    showFooter?: boolean
}

type DispatchProps = {
    closeModal: () => any;
}

type Props = StateProps & DispatchProps;

const ModalManager = (props: Props) => {
    useEffect(() => {
        ReactModal.setAppElement('body');
    }, []);

    let modalContent;

    switch (props.type) {
        case ModalType.ViewGoal:
            modalContent = <Kanban {...props.props} />
            break;
        default:
            modalContent = <div>hello modal</div>
    }

    const footer = props.showFooter ?
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={props.closeModal}>
                        Close
                    </button>
                    <button className='btn btn-primary'>
                        Save changes
                    </button>
                </Modal.Footer> : null;

    return (
        <ReactModal isOpen={props.isOpen} onRequestClose={props.closeModal}>
            <Modal.Header>
                <Modal.Title>{props.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalContent}
            </Modal.Body>
            { footer }
        </ReactModal>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);