import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatTabs = () => {
    const chats: { [chatId: string]: Object } = { '1': { id: '1' }, '2': { id: '2' }, '3': { id: '3' } };
    const minimized: string[] = [];
    const [activeChats, setActiveChats] = useState(chats);
    const [minimizedChatIds, setMinimizedChatIds] = useState(minimized);

    const closeChat = (chatId: string) => {
        const { [chatId]: _, ...newChats } = activeChats;
        setActiveChats(newChats);
    }

    const minimizeChat = (chatId: string) => {
        if (minimizedChatIds.includes(chatId)) {
            setMinimizedChatIds(minimizedChatIds.filter(id => id !== chatId));
        } else {
            setMinimizedChatIds([chatId, ...minimizedChatIds]);
        }
    }

    return (
        <div className='chat-tabs'>
            {Object.entries(activeChats)
                .map(([chatId, chat]) =>
                    <ChatWindow key={chatId}
                        chat={chat}
                        minimized={minimizedChatIds.includes(chatId)}
                        close={(chatId: string) => closeChat(chatId)}
                        minimize={(chatId: string) => minimizeChat(chatId)}
                    />)}
        </div>
    )
};

export default ChatTabs;

