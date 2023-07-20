import React, { useEffect, useState } from "react";
import axios from "axios";
import { FriendsListFriend } from "../styledComponents/Chat";
const OnlineFriend = ({
  userId,
  setCurrentChat,
  friendId,
  isOnline,
  setConversations,
  conversations,
}) => {
  const [friend, setFriend] = useState();
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          url: `${import.meta.env.VITE_URL}/user/${friendId}`,
        });

        if (response) {
          //   console.log(response);
          const userInfo = response.data.user;
          setFriend(userInfo);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getConversation();
  }, [friendId]);
  const checkConversationExist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${
          import.meta.env.VITE_URL
        }/conversation/find/${userId}/${friendId}`,
      });
      if (response.data) {
        localStorage.setItem("chatId", response.data._id)
        setCurrentChat(response.data);
      } else {
        createConversation();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createConversation = async () => {
    try {
      const response = await axios({
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${import.meta.env.VITE_URL}/conversation`,
        data: {
          senderId: userId,
          receiverId: friendId,
        },
      });

      if (response) {
        const createdChat = response.data._id;
        setCurrentChat(response.data);
        setConversations([response.data, ...conversations]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FriendsListFriend onClick={(e) => checkConversationExist(e)}>
      {friend && (
        <>
          <div className="image-status">
            <img src="../images/avatar.png" alt="" />
            <div className={"dot " + isOnline}></div>
          </div>

          {/* <img src={friend.picture[0].url ? friend.picture[0].url : ""} /> */}

          <div className="name-status">
            <div>
              {friend.fname} {friend.lname}
            </div>
          </div>
        </>
      )}
    </FriendsListFriend>
  );
};

export default OnlineFriend;
