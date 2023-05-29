import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

import avatar from "../images/avatar.png"
//styled components
import { ExploreContainer, UserCard, UserCardContainer } from "../styledComponents/Explore";
export default function ExploreUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("id"));
  const [notFollowing, setnotFollowing] = useState([]);

  const getOtherUsers = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:4000/explore",
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
                <img src={avatar} alt="" />
                <h3>
                  {" "}
                  {not.fname} {not.lname}{" "}
                </h3>
                <div className="usercard-bio">Lorem ipsum dolor sit amet, consectetur Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam doloremque itaque sapiente cumque enim laboriosam dignissimos, eum vel, sit minima, placeat ducimus excepturi accusantium! Dicta iste neque culpa nobis corrupti!
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
