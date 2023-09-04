import React, { useEffect, useState } from "react";
// import TimeAgo from "react-timeago";
// import ReactTimeAgo from "react-time-ago";
// import TimeAgo from "javascript-time-ago";
import { MessageTop, MessageAndTimestamp } from "../styledComponents/Chat";
// import en from "javascript-time-ago/locale/en.json";

// TimeAgo.addDefaultLocale(en);
import moment from "moment";

// export const useDate = () => {

//   React.useEffect(() => {
//       const timer = setInterval(() => { // Creates an interval which will update the current data every minute
//       // This will trigger a rerender every component that uses the useDate hook.
//       setDate(new Date());
//     }, 60 * 1000);
//     return () => {
//       clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
//     }
//   }, []);

//   return moment(new Date(message.createdAt)).fromNow()
// };

const Message = ({ userMessage, message }) => {
  // console.log(useDate())

  const [timeAgo, setTimeAgo] = useState(
    moment(new Date(message.createdAt)).fromNow()
  );
  // console.log(timeAgo);

  useEffect(() => {
    // setTimeAgo(moment(new Date(message.createdAt)).fromNow())
    const interval = setInterval(() => {
      setTimeAgo(moment(new Date(message.createdAt)).fromNow());
    }, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // console.log(moment(new Date(message.createdAt)).fromNow());
  return (
    <div className={userMessage ? "message user" : "message"}>
      <img src="../images/avatar.png" alt="" />
      <MessageAndTimestamp>
        <MessageTop isUser={userMessage && "true"}>
          {/* {message.text} */}
          <p className="messageText">{message.text}</p>
        </MessageTop>
        {/* <ReactTimeAgo
          date={Date.parse(message.createdAt)}
          locale="en-US"
          timeStyle="round-minute"
          className="timestamp"
        /> */}
        <div>
          {/* {timeSince(message.createdAt)} */}
          {/* {moment(new Date(message.createdAt)).fromNow()} */}
          {timeAgo}
        </div>
      </MessageAndTimestamp>
    </div>
  );
};

export default Message;
