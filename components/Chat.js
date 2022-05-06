import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';


// Ref: https://www.npmjs.com/package/react-native-gifted-chat

export const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // gọi api lấy danh sách 10 users https://randomuser.me/api/?page=3&results=10
        setMessages([
            {
                _id: 1,
                text: 'Hello developer from 19BITV02',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Mr Teo',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}