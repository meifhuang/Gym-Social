import React, { useEffect, useState } from "react";
import axios from "axios";
import { FriendsListFriend } from "../styledComponents/Chat";
const OnlineFriend = ({ userId, isOnline }) => {
  const [friend, setFriend] = useState();
  console.log(isOnline);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          url: `${import.meta.env.VITE_URL}/user/${userId}`,
        });

        if (response) {
          console.log(response);
          const userInfo = response.data.user;
          setFriend(userInfo);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getConversation();
  }, []);
    

  return (
    <FriendsListFriend>
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
