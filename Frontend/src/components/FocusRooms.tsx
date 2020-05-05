import React from 'react';
import { connect } from 'react-redux';
import { Card, CardDeck } from 'react-bootstrap';

import { AppState } from '../reducers/rootReducer';
import { User } from '../models/User';
import { Room } from '../models/Room';
import history from '../history';

const mapStateToProps = (state: AppState) => {
    return { currentUser: state.userReducer.currentUser }
};

const mapDispatchToProps = (dispatch: any) => ({
});

type Props = {
    currentUser: User
}
const rooms: Room[] = [{
    id: 'x-1',
    ownerId: 'x'
}, {
    id: 'x-2',
    ownerId: 'y'
}, {
    id: 'x-3',
    ownerId: 'z'
}]

const FocusRooms = (props: Props) => {
    return (
        <CardDeck className='mt-3 col-12 row no-gutters'>
            {rooms.map(room =>
                <Card
                    bg='info'
                    key={room.id}
                    text='white'
                    style={{ width: '18rem' }}
                    onClick={() => history.push(`/rooms/${room.id}`)}
                >
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                        <Card.Title>{room.id}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </CardDeck>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FocusRooms);