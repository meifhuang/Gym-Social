import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

//styled components
import {
  ExploreContainer,
  UserCard,
  UserCardContainer,
} from "../styledComponents/Explore";
export default function ExploreUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("id"));
  const [notFollowing, setnotFollowing] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const {userPicUrl} = useContext(AuthContext)

  const getOtherUsers = async () => {

    try {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/explore`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res) {
        const notFollowing = res.data.users.filter(
          (x) => !res.data.following.find((y) => y._id === x._id)
        );
        setnotFollowing(notFollowing);
      } else {
        console.log("no responses");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getOtherUsers();
  }, []);

  const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <ExploreContainer>
      <h1> Explore other community members!</h1>
      <UserCardContainer>
        {notFollowing &&
          notFollowing.map((not) => {
            return (
              <UserCard className="users">
                <img src={not.picture[0].url} alt="" />
                <h3>
                  {" "}
                  {not.fname} {not.lname}{" "}
                </h3>
                <div className="usercard-bio">
                  {not.bio}
                </div>
                <button onClick={() => viewProfile(not._id)}>
                  {" "}
                  View Profile{" "}
                </button>{" "}
              </UserCard>
            );
          })}
      </UserCardContainer>
    </ExploreContainer>
  );
}
