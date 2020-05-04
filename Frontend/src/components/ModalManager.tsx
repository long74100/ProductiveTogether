import React, { Component } from 'react';
import { connect } from 'react-redux';
import { default as ReactModal } from 'react-modal';

import { AppState } from '../reducers/rootReducer';
import { closeModal, ModalType } from '../actions/modalActions';
import { Modal } from 'react-bootstrap';
import { thisExpression } from '@babel/types';

const mapStateToProps = (state: AppState) => {
    const { isOpen, type, props } = state.modalReducer;
    return { isOpen, type, props };
};

const mapDispatchToProps = (dispatch: any) => ({
    closeModal: () => dispatch(closeModal())
});

type StateProps = {
    isOpen: boolean,
    type: ModalType,
    props: any
}

type DispatchProps = {
    closeModal: () => any;
}

type Props = StateProps & DispatchProps;


class ModalManager extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <ReactModal isOpen={this.props.isOpen}>
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <hr />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Aspernatur assumenda ex iure, necessitatibus odit optio quas
                      recusandae repellat totam. Alias dignissimos ea obcaecati quae
                  qui recusandae rem repellendus, vel veniam!</p>

                    <p>Consequatur delectus doloremque in quam qui reiciendis rem
                      ut. Culpa cupiditate doloribus eos est ex illum magni nesciunt
                      obcaecati odit ratione, saepe vitae? Accusantium aliquid
                  assumenda fugiat perferendis ratione suscipit!</p>

                    <p>Accusantium ad alias aliquid architecto, aspernatur autem
                      commodi distinctio dolor ducimus excepturi fugit hic laborum
                      maxime, mollitia necessitatibus neque nihil odio, officiis
                  quae quaerat quam quasi quia sed tempore ut!</p>

                    <p>Accusamus asperiores aspernatur atque commodi consectetur
                      cumque cupiditate distinctio dolor dolorum eum excepturi
                      expedita explicabo fugiat iusto, labore magnam, natus nesciunt
                      nobis odio officiis provident quam, quasi quo saepe
                  suscipit!</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-default' onClick={this.props.closeModal}>
                        Close
                </button>
                    <button className='btn btn-primary'>
                        Save changes
                </button>
                </Modal.Footer>
            </ReactModal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalManager);