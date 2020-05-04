import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CardDeck } from 'react-bootstrap';

import { Goal } from '../models/Goal';
import { loadAllDailyGoals } from '../actions/goalActions';
import { openModal, ModalType } from '../actions/modalActions';
import GoalCard from './GoalCard';

const mapDispatchToProps = (dispatch: any) => ({
    openModal: (modalType: ModalType, props: any) => dispatch(openModal(modalType, props)),
    loadDailyGoals: () => dispatch(loadAllDailyGoals())
});

type Props = {
    openModal: (modalType: ModalType, props: any) => void,
    loadDailyGoals: () => Promise<Goal[]>
}

const DailyGoals = (props: Props) => {

    useEffect(() => {
        props.loadDailyGoals().then(res => console.log(res));
    }, []);

    const openCreateGoalModal = () => {
        props.openModal(ModalType.CreateGoal, {});
    }

    const goals = [1, 2, 3, 7, 9, 0, 2, 1, 1, 3, 5].map(n =>
        <div className="col-auto mb-3 w-25">
            <GoalCard />
        </div>
    )
    return (
        <div className="row">
            <div className="col-12 text-right">
                <button className="px-3 py-1" onClick={openCreateGoalModal}>Create goal</button>
            </div>
            <CardDeck className="mt-3 col-12 row no-gutters">
                {goals}
            </CardDeck>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(DailyGoals);
