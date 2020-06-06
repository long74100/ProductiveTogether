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
                <input className='w-100 py-1' placeholder='Type a message...' />
            </div>
        );
    }
}

export default ChatWindow;