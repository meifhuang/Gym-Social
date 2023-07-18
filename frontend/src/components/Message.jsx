import React from "react";
// import TimeAgo from "react-timeago";
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
const Message = ({ userMessage, message }) => {
  return (
    <div className={userMessage ? "message user" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>

          <ReactTimeAgo date={message.createdAt} locale="en-US" timeStyle="round-minute"/>
    </div>
  );
};

export default Message;
