import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CardDeck } from 'react-bootstrap';

import { Goal } from '../models/Goal';
import { User } from '../models/User';
import { loadAllDailyGoals, createDailyGoalForUser } from '../actions/goalActions';
import { openModal, ModalType } from '../actions/modalActions';
import GoalCard from './GoalCard';
import { AppState } from '../reducers/rootReducer';
import { CustomButton } from '.';

const mapStateToProps = (state: AppState) => {
    return {
        ...state.goalReducer,
        currentUser: state.userReducer.currentUser
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    openModal: (modalType: ModalType, props: any) => dispatch(openModal(modalType, props)),
    loadDailyGoals: () => dispatch(loadAllDailyGoals()),
    createDailyGoal: (userId: string) => dispatch(createDailyGoalForUser(userId))
});

type DispatchProps = {
    openModal: (modalType: ModalType, props: any) => void,
    loadDailyGoals: () => Promise<Goal[]>,
    createDailyGoal: (userId: string) => Promise<Goal>
}

type StateProps = {
    dailyGoals: { [id: string]: Goal },
    currentUser: User
}

type Props = DispatchProps & StateProps;

const DailyGoals = (props: Props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.loadDailyGoals();
    });

    const createDailyGoal = () => {
        setLoading(true);
        props.createDailyGoal(props.currentUser.id)
            .then(res => setLoading(false))
            .catch(error => setLoading(false));
    }

    const openViewGoalModal = (goal: Goal) => {
        props.openModal(ModalType.ViewGoal, { goal, canEdit: goal.userId === props.currentUser.id });
    }

    const goals = Object.entries(props.dailyGoals).map(([id, goal], index) => {
        return (
            <div className='col-md-3 mb-3' key={id} onClick={() => openViewGoalModal(goal)} >
                <GoalCard goal={goal} />
            </div>
        );
    });

    return (
        <div className='row'>
            <div className='col-12 text-right'>
                <CustomButton className={'create-goal-btn'} loading={loading} text='Create goal' onClick={createDailyGoal} />
            </div>
            <CardDeck className='mt-3 col-12 row no-gutters'>
                {goals}
            </CardDeck>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyGoals);
