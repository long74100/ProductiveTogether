import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardDeck } from 'react-bootstrap';

import GoalCard from './GoalCard';
import { openModal, ModalType } from '../actions/modalActions';

const mapDispatchToProps = (dispatch: any) => ({
    openModal: (modalType: ModalType, props: any) => dispatch(openModal(modalType, props)),
});

interface Props {
    openModal: (modalType: ModalType, props: any) => void,
}

class DailyGoals extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    openCreateGoalModal = () => {
        this.props.openModal(ModalType.CreateGoal, {});
    }

    render() {
        const goals = [1, 2, 3, 7, 9, 0, 2, 1, 1, 3, 5].map(n =>
            <div className="col-auto mb-3 w-25">
                <GoalCard />
            </div>
        )
        return (
            <div className="row">
                <div className="col-12 text-right">
                    <button className="px-3 py-1" onClick={this.openCreateGoalModal}>Create goal</button>
                </div>
                <CardDeck className="mt-3 col-12 row no-gutters">
                    {goals}
                </CardDeck>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(DailyGoals);
