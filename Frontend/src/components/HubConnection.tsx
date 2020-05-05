import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as signalR from "@aspnet/signalr";

import { User } from '../models/User';
import { Room } from '../models/Room';
import { AppState } from '../reducers/rootReducer';

const mapStateToProps = (state: AppState) => {
    return { currentUser: state.userReducer.currentUser }
};

type Props = {
    currentUser: User,
    computedMatch: any
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

class Hub extends Component<Props> {
    constructor(props: any) {
        super(props);

        this.state = {
            connection: null
        }
        console.log(props);
    }

    async componentDidMount() {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:8081/signalrtc')
            .build();

        await connection.start();

        connection.on('AddToGroup', (data) => {
            console.log("hello")
            console.log(data);
        })

        connection.on('RemoveFromGroup', (data) => {
            console.log(data);
        })

        connection.on('SendSignalToGroup', (data) => {
            console.log(data);
        })

        const roomId = this.props.computedMatch.params.id;
        const userName = this.props.currentUser.userName;
        connection.invoke('AddToGroup', userName, roomId);

        this.setState({ connection });

    }

    render() {
        return (
            <></>
        );
    }
}

export default connect(mapStateToProps, null)(Hub);