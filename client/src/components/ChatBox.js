import './ChatBox.scss';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
function ChatBox(props) {
    const [messages, setMessages] = useState([]);
    const [ socket ] = useState( () => io(":3030") );
    useEffect(() => {
        console.log("use effect running (ChatBox)")
        socket.on("comment_added", (data) => {
            console.log(data);
            console.log(messages);
            setMessages([...messages, {
                clsName: "comTxt",
                timestamp: data.timestamp,
                user: data.user,
                content: `says: ${data.content}`
            }]);
        });
        socket.on("user_entered", (data) => {
            setMessages([...messages, {
                clsName: "new",
                timestamp: data.timestamp,
                user: data.user,
                content: `has entered`
            }]);
        });
    //    return () => socket.disconnect();
    }, [messages]);
    return (
	    <div className='chat-box'>
            { messages.map((message, i) => (
                <p key={message.timestamp}>{message.user} <span className={message.clsName}> { message.content }</span></p>
            )).reverse() }
        </div>
    ) ;
}
export default ChatBox;
