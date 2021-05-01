import './App.css';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
function App() {
    const [alias, setAlias] = useState("");
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket] = useState(() => io(":3030"));
    useEffect(() => {
        socket.on("user_entered", (data) => {
            setMessages([...messages, {
                clsName: "new",
                user: data.user,
                content: `has entered`
            }]);
        });
        socket.on("comment_added", (data) => {
            console.log(data);
            setMessages([...messages, {
                clsName: "comTxt",
                user: data.user,
                content: `says: ${data.content}`
            }]);
            
        });
        const als = prompt("choose an alias");
        socket.emit("new_user", {user:als});
        setAlias(als);
    }, []);
    const onTextChanged = (e) => {
        setText(e.target.value);
    }
    const onChatSubmit = (e) => {
        e.preventDefault();
        socket.emit("new_comment", {content: text, user: alias});
        setText("");
    }
    return (
	    <div id='container'>
	    	<h1>CYBER WORLD</h1>
	    	<div id='chatBox'
                className={ alias !== "" ? "show" : "hide" }>
                { messages.map((message, i) => (
                    <p key={i}>{message.user} <span className={message.clsName}> { message.content }</span></p>
                )) }
            </div>
            <form onSubmit={onChatSubmit}
                className={ alias !== "" ? "show" : "hide" }>
	    		<input id='inputTxt' type='text' value={text} onChange={ onTextChanged }/>
	    		<input id='chatBtn' type='submit' value='ENTER' />
	    	</form>
	    </div>
    )
}

export default App;
