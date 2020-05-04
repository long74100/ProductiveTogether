import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-solid-svg-icons";

const GoalCard = () => {
    return (
        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <div className="thumbnail-date">
                <div className="day">27</div>
                <div className="month">Mar</div>
            </div>
            <Card.Body className="mt-3">
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                    This card has supporting text below as a natural lead-in to additional
                content.{' '}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="row">
                    <small className="text-muted col-9">Last updated 3 mins ago</small>
                    <FontAwesomeIcon icon={faComments} style={{ 'color': 'grey' }} />
                </div>
            </Card.Footer>
        </Card>
    )
}

export default GoalCard;