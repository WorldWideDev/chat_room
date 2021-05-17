import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './ChatForm.scss';

function ChatForm(props) {
    const [text, setText] = useState("");
    const [ socket ] = useState( () => io(":3030") );
    const { alias } = props;
    useEffect(() => {
        return () => socket.disconnect();
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
        <form onSubmit={onChatSubmit}>
	    	<input className='input-txt' type='text' value={text} onChange={ onTextChanged }/>
	    	<input className='btn chat-btn' type='submit' value='ENTER' />
	    </form>
    )

}
export default ChatForm;
