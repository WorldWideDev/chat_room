import './ChatBox.scss';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import ChatEntry from './ChatEntry';
function ChatBox(props) {
    const [messages, setMessages] = useState([]);
    const [ socket ] = useState( () => io(":3030") );
    useEffect(() => {
        socket.on("comment_added", (data) => {
            setMessages((prevMessages) => {
                console.log(prevMessages);
                return [...prevMessages, {
                    clsName: "comTxt",
                    timestamp: data.timestamp,
                    user: data.user,
                    content: `says: ${data.content}`
                }];
            });
        });
        socket.on("user_entered", (data) => {
            setMessages((prevMessages) => {
                return [...prevMessages, {
                    clsName: "new",
                    timestamp: data.timestamp,
                    user: data.user,
                    content: `has entered`
                }];
            });
        });
        return () => socket.disconnect();
    }, []);
    return (
	    <div className='chat-box'>
            { messages.map((message, i) => (
                <ChatEntry key={message.timestamp} message={message} />
            )).reverse() }
        </div>
    ) ;
}
export default ChatBox;
