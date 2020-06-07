import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

type Props = {
    chat: any;
    minimized: boolean;
    minimize: (id: string) => any
    close: (id: string) => any;
}

const ChatWindow = (props: Props) => {
    if (props.minimized) {
        return (
            <div className='chat-window'>
                <div className='chat-header' onClick={() => props.minimize(props.chat.id)}>
                    {props.chat.id}
                    <FontAwesomeIcon icon={faWindowClose} size='2x' onClick={() => props.close(props.chat.id)} />
                </div>
            </div>
        )
    } else {
        return (
            <div className='chat-window'>
                <div className='chat-header' onClick={() => props.minimize(props.chat.id)}>
                    {props.chat.id}
                    <FontAwesomeIcon icon={faWindowClose} size='2x' onClick={() => props.close(props.chat.id)} />
                </div>
                <p>hello</p>
                <p>what?</p>
                <p>huh</p>
                <p>duh</p>
                <div className="input-group">
                    <input className='w-75 py-1 form-control' placeholder='Type a message...' />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary bg-warning text-white border-0" type="button">Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatWindow;