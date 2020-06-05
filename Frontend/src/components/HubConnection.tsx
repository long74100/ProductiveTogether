import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as signalR from "@aspnet/signalr";

import { User } from '../models/User';
import { AppState } from '../reducers/rootReducer';

const mapStateToProps = (state: AppState) => {
    return { currentUser: state.userReducer.currentUser }
};

type State = {
    connection?: signalR.HubConnection,
    roomId: string,
    userName: string,
    localVideo: any,
    localStream: any,
    localConnectionId: string,
    peerStreams: any,
    peerConnections: any
}

type Props = {
    currentUser: User,
    computedMatch: any
}

class Hub extends Component<Props, State> {
    peerConnectionConfig = {
        'iceServers': [
            { 'urls': 'stun:stun.stunprotocol.org:3478' },
            { 'urls': 'stun:stun.l.google.com:19302' },
        ]
    }

    hubUrl = 'https://localhost:8081/hub';

    constructor(props: any) {
        super(props);

        this.state = {
            connection: undefined,
            roomId: this.props.computedMatch.params.id,
            userName: this.props.currentUser.userName,
            localStream: null,
            localVideo: React.createRef(),
            localConnectionId: '',
            peerStreams: {},
            peerConnections: {}
        }
    }

    makeLabel = (label: string) => {
        return (
            <div className='video-label'>
                {label}
            </div>
        )
    }

    gotIceCandidate(event: any, connectionId: string) {
        const { connection, roomId } = this.state;
        if (connection && event.candidate != null) {
            connection.invoke('Ice', event.candidate, connectionId, roomId)
        }
    }

    renderStream(stream: any, connectionId: string) {
        const userName = this.state.peerConnections[connectionId].userName;
        const videoObject = <video ref={this.state.localVideo} autoPlay width="320" height="240" controls></video>;
        this.state.localVideo.current.srcObject = stream;
        return (
            <div id={`${connectionId}-video`} key={`${connectionId}-video`} className="video-container">
                {videoObject}
                {this.makeLabel(userName)}
            </div>
        );
    }

    gotRemoteStream(event: any, connectionId: string) {
        this.setState({ peerStreams: { ...this.state.peerStreams, [connectionId]: event.streams[0] } })
    }

    createdDescription = (description: any, peerConnectionId: string) => {
        const { connection, peerConnections, roomId } = this.state;

        peerConnections[peerConnectionId].pc.setLocalDescription(description).then(() => {
            if (connection) {
                connection.invoke('Sdp', description, peerConnectionId, roomId);
            }
        });
    }

    checkPeerDisconnect(event: any, peerConnectionId: string) {
        const { peerConnections, peerStreams } = this.state;
        if (peerConnections[peerConnectionId]) {
            const state = peerConnections[peerConnectionId].pc.iceConnectionState;
            if (state === "failed" || state === "closed" || state === "disconnected") {
                delete peerConnections[peerConnectionId];
                delete peerStreams[peerConnectionId];
    
                this.setState({ peerConnections, peerStreams });
            }
        }
    }


    setUpPeerConnection = (connectionId: string, username: string, initCall: boolean = false) => {
        const { peerConnections, localStream } = this.state;

        const peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
        peerConnection.onicecandidate = ev => this.gotIceCandidate(ev, connectionId);
        // @ts-ignore
        peerConnection.ontrack = ev => this.gotRemoteStream(ev, connectionId);
        peerConnection.oniceconnectionstatechange = ev => this.checkPeerDisconnect(ev, connectionId);
        // @ts-ignore
        peerConnection.addStream(localStream);

        if (initCall) {
            peerConnection.createOffer().then(description => this.createdDescription(description, connectionId));
        }

        const connection = {
            userName: username,
            connectionId: connectionId,
            pc: peerConnection
        }

        peerConnections[connectionId] = connection;
        this.setState({ peerConnections });
    }


    componentDidMount() {
        const { userName, roomId, localVideo } = this.state;
        const accessToken = sessionStorage.getItem('accessToken') || '';
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl, { accessTokenFactory: () => accessToken })
            .build();

        const constraints = {
            video: true,
            audio: true
        };

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(localStream => {
                    this.setState({ localStream });
                    localVideo.current.srcObject = localStream;
                    console.log(localVideo);
                })

                // set up websocket and message all existing clients
                .then(() => {
                    connection.start().then(res => {
                        connection.on('AddToGroup', (data) => {
                            if (data.userName !== userName) {
                                const { roomId, userName } = this.state;
                                this.setUpPeerConnection(data.connectionId, data.userName);
                                connection.invoke('SendSignal', userName, data.connectionId, roomId);
                            } else {
                                this.setState({ localConnectionId: data.connectionId });
                            }
                        });

                        connection.on('RemoveFromGroup', (data) => {
                            const { peerConnections, peerStreams } = this.state;
                            delete peerConnections[data.connectionId];
                            delete peerStreams[data.connectionId];
                            this.setState({ peerConnections, peerStreams });
                        });


                        connection.on('SendSignal', (data) => {
                            const { localConnectionId } = this.state;
                            if (data.dest === localConnectionId) {
                                this.setUpPeerConnection(data.connectionId, data.userName, true);
                            }
                        });

                        connection.on('Sdp', (data) => {
                            const { peerConnections, localConnectionId } = this.state;
                            const { connectionId, dest } = data;
                            if (dest === localConnectionId && peerConnections[connectionId]) {
                                peerConnections[connectionId].pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
                                    // Only create answers in response to offers
                                    if (data.sdp.type === 'offer') {
                                        peerConnections[connectionId].pc.createAnswer().then((description: any) => {
                                            this.createdDescription(description, connectionId)
                                        })
                                    }
                                });
                            }

                        });

                        connection.on('Ice', (data) => {
                            const { peerConnections, localConnectionId } = this.state;
                            const { connectionId, dest } = data;

                            if (dest === localConnectionId && peerConnections[connectionId]) {
                                peerConnections[connectionId].pc.addIceCandidate(new RTCIceCandidate(data.ice));
                            }
                        })

                        connection.invoke('AddToGroup', this.state.userName, roomId);

                        this.setState({ connection });

                    });
                });

        } else {
            alert('Your browser does not support getUserMedia API');
        }
    }

    componentWillUnmount() {
        const { roomId, connection } = this.state;
        if (connection) {
            connection.invoke('RemoveFromGroup', roomId);
            this.state.localStream.getTracks().forEach((track: any) => { track.stop(); });
        }
    }

    render() {
        const { userName, peerStreams } = this.state;
        const streams = Object.entries(peerStreams).map(([connectionId, stream], index) => this.renderStream(stream, connectionId));
        console.log(streams);
        return (
            <div id="videos" className="videos">
                <div id="local-video-container" className="video-container">
                    <video ref={this.state.localVideo} id="local-video" autoPlay width="320" height="240" controls></video>
                    {this.makeLabel(userName)}
                </div>
                {streams}
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Hub);