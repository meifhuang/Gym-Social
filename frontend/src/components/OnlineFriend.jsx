import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FriendsListFriend } from "../styledComponents/Chat";
const OnlineFriend = ({ userId, friendId, isOnline, setCurrentChat }) => {
  //   const [friend, setFriend] = useState();
  // console.log(friendId)

  const friend = useRef();
//   useEffect(() => {
//     const getFriend = async () => {
//     //   console.log("dsadasdasd");
//       try {
//         const response = await axios({
//           method: "get",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           url: `${import.meta.env.VITE_URL}/user/${friendId}`,
//         });

//         if (response) {
//           //   console.log(response);
//           const userInfo = response.data.user;
//           friend.current = userInfo;
//           //   setFriend(userInfo);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     getFriend();
//   }, [isOnline]);

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
      console.log(response.data);
      if (response.data) {
        console.log("ALREADY HAS CONVO");
        setCurrentChat(response.data);
      } else {
        createConversation();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createConversation = async () => {
    console.log("convo created");
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
        console.log(response);
        const createdChat = response.data._id;
        setCurrentChat(createdChat);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <FriendsListFriend
    //   onClick={(e) => checkConversationExist(e)}
    >
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
