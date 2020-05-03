import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';

import GoalCard from './GoalCard';


type Props = {};

class DailyGoals extends Component<Props> {
    constructor(props: Props) {
        super(props);
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
                    <button className="px-3 py-1">Create goal</button>
                </div>
                <CardDeck className="mt-3 col-12 row no-gutters">
                    {goals}
                </CardDeck>
            </div>
        )
    }
}

export default DailyGoals;