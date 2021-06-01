import './ChatEntry.scss';
import React from 'react';

function timestampFormatter(ts) {
    return new Date(ts).toLocaleTimeString();
}
function ChatEntry(props) {
    const { timestamp, user, content, clsName } = props.message;
    return (
        <div className={`chat-entry ${clsName}`}>
            <p className="chat-entry-content"><span className="chat-entry-identifier">{user}</span> {content }</p>
            <p>{timestampFormatter(timestamp)}</p>
        </div>
    )
}
export default ChatEntry;
