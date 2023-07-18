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
        {/* <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> */}
        <p className="messageText">{message.text}</p>
      </div>
      {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
          {/* <TimeAgo timeStyle="round-minute" className="timestamp" date={message.createdAt} /> */}
          <ReactTimeAgo date={message.createdAt} locale="en-US" timeStyle="twitter-first-minute"/>
    </div>
  );
};

export default Message;
