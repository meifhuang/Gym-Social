import React, { useEffect, useState } from "react";
import axios from "axios";
import { FriendDiv } from "../styledComponents/Chat";

const Friend = ({ userId, conversation }) => {
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
  return (
    <FriendDiv>
      {friend && (
        <>
          <img src="../images/avatar.png" alt="" />
          {/* <img src={friend.picture[0].url ? friend.picture[0].url : ""} /> */}

          <div>
            {friend.fname} {friend.lname}
          </div>
        </>
      )}
    </FriendDiv>
  );
};

export default Friend;
