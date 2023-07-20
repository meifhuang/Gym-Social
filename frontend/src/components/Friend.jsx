import React, { useEffect, useState } from "react";
import axios from "axios";
import { FriendDiv } from "../styledComponents/Chat";
import { CrossIcon } from "../assets/icons";

const Friend = ({
  userId,
  conversation,
  setConversations,
  conversations,
  setCurrentChat,
  setMessages,
}) => {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (memberId) => memberId !== userId
    );
    const getFriendInfo = async () => {
      try {
        const response = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          url: `${import.meta.env.VITE_URL}/user/${friendId}`,
        });

        if (response) {
          const userInfo = response.data.user;
          setFriend(userInfo);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getFriendInfo();
  }, [userId, conversation]);

  const archiveConversation = async (id) => {
    try {
      const response = await axios({
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${import.meta.env.VITE_URL}/conversation/${id}`,
        data: {
          archivedStatus: true,
        },
      });
      if (response) {
        // console.log(conversations);
        setConversations(
          conversations.map((conversation) => {
            if (conversation._id === id) {
              return { ...conversation, archived: true };
            } else {
              return conversation;
            }
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <FriendDiv>
      {friend && (
        <>
          <img src="../images/avatar.png" alt="" />
          {/* <img src={friend.picture[0].url ? friend.picture[0].url : ""} /> */}

          <div className="name">
            {friend.fname} {friend.lname}
          </div>
          <button onClick={() => archiveConversation(conversation._id)}>
            <CrossIcon />
          </button>
        </>
      )}
    </FriendDiv>
  );
};

export default Friend;
