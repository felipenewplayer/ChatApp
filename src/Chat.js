import React, { useState, useEffect } from 'react';
import './styles/Chat.css';
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where
} from 'firebase/firestore';

import { auth, db } from './firebase';

export const Chat = ({ room }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesRef = collection(db, ' messages');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessages = query
        (messagesRef, where('room', '==', room),
        orderBy('createAt')
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            });
            setMessages(messages);
        });

        return () => unsuscribe();
    }, [])

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if (newMessage === '') return;

        await addDoc(messagesRef, {
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage('')
    };

    return (
        <div className='chat-app'>
            <div className='header'>
                <h1>Welcome to: {room.toUpperCase()}</h1>
            </div>
            <div className='messages'>
                {messages.map((message) => (
                <div className='message' key={message.id}>
                    <span className='user'>{message.user}</span>
                    {message.text}
                </div>
            )
            )
            }
            </div>
            <form 
                onSubmit={handlerSubmit}
                className='new-message-form'>
                <input
                    onChange={(e) => setNewMessage(e.target.value)}
                    className='new-message-input'
                    placeholder='type your message here...'
                    value={newMessage}
                />
                <button
                    type='submit'
                    className='send-button'>
                    Send
                </button>
            </form>
        </div>
    )
}
