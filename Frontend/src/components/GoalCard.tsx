import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { Goal } from '../models/Goal';

type Props = {
    goal: Goal
}

const GoalCard = (props: Props) => {
    const { goal } = props;
    const date = new Date(goal.date);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();

    return (
        <Card className='goal-card'>
            <Card.Img variant='top' src='https://www.bu.edu/admissions/files/2018/07/17-2005-AERIALS-101-cropped-e1535295662889-1200x675.jpg' />
            <div className='thumbnail-date'>
                <div className='day'>{day}</div>
                <div className='month'>{month}</div>
            </div>
            <Card.Body className='mt-3'>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                    This card has supporting text below as a natural lead-in to additional
                content.{' '}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className='row'>
                    <small className='text-muted col-10'>Last updated 3 mins ago</small>
                    <FontAwesomeIcon icon={faComments} style={{ 'color': 'grey' }} />
                </div>
            </Card.Footer>
        </Card>
    )
}

export default GoalCard;