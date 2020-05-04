import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CardDeck } from 'react-bootstrap';

import { Goal } from '../models/Goal';
import { loadAllDailyGoals } from '../actions/goalActions';
import { openModal, ModalType } from '../actions/modalActions';
import GoalCard from './GoalCard';
import { AppState } from '../reducers/rootReducer';

const mapStateToProps = (state: AppState) => (state.goalReducer);

const mapDispatchToProps = (dispatch: any) => ({
    openModal: (modalType: ModalType, props: any) => dispatch(openModal(modalType, props)),
    loadDailyGoals: () => dispatch(loadAllDailyGoals())
});

type DispatchProps = {
    openModal: (modalType: ModalType, props: any) => void,
    loadDailyGoals: () => Promise<Goal[]>
}

type StateProps = {
    dailyGoals: { [id: string]: Goal }
}

type Props = DispatchProps & StateProps;

const DailyGoals = (props: Props) => {

    useEffect(() => {
        props.loadDailyGoals();
    }, []);

    const openCreateGoalModal = () => {
        props.openModal(ModalType.CreateGoal, {});
    }

    const goals = Object.entries(props.dailyGoals).map((key, val) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(DailyGoals);
