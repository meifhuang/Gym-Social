import React from "react";
// import TimeAgo from "react-timeago";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import { MessageTop, MessageAndTimestamp } from "../styledComponents/Chat";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);
const Message = ({ userMessage, message }) => {
  return (
    <div className={userMessage ? "message user" : "message"}>
      <img src="../images/avatar.png" alt="" />
      <MessageAndTimestamp>
        <MessageTop isUser={userMessage && "true"}>
          {/* {message.text} */}
          <p className="messageText">{message.text}</p>
        </MessageTop>
        <ReactTimeAgo
          date={Date.parse(message.createdAt)}
          locale="en-US"
          timeStyle="round-minute"
          className="timestamp"
        />
      </MessageAndTimestamp>
    </div>
  );
};

export default Message;
