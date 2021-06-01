import io from 'socket.io-client';
import './App.scss';
import ChatForm from './ChatForm';
import ChatBox from './ChatBox';
import React, { useState, useEffect } from 'react';
function App() {
    const [alias, setAlias] = useState("");
    const [socket] = useState(() => io(":3030"));
    useEffect(() => {
        socket.on("connect", () => {
            console.log("CONNECTING");
            const als = prompt("choose an alias");
            setAlias(als);
            socket.emit("new_user", {user:als});
        });
        return () => {
            return socket.disconnect();
        }
    }, [socket]);
    return (
        alias === "" ? null :
	    <div className='container'>
	    	<h1>CYBER WORLD</h1>
            <ChatForm alias={alias} />
            <ChatBox alias={alias} />
	    </div>
    )
}

export default App;
