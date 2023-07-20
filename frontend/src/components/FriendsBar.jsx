import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Friend from "./Friend";
import Message from "./Message";
import axios from "axios";
import { io } from "socket.io-client";
import OnlineFriend from "./OnlineFriend";
import { v4 as uuidv4 } from "uuid";
import {
  ChatContainer,
  MessageContainer,
  TextBox,
  MessageList,
  FriendsList,
  ConversationList,
} from "../styledComponents/Chat";
const FriendsBar = () => {
  const { userId } = useContext(AuthContext);
  const BASE_URL = import.meta.env.VITE_URL;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  // const [friends, setFriends] = useState([]);

  function isSpacesOnly(str) {
    if (!str.trim()) {
      return true;
    }
  }

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getFollowers = async () => {
      if (userId) {
        try {
          const response = await axios({
            method: "get",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            url: `${BASE_URL}/profile/${userId}`,
          });

          if (response) {
            const followers = response.data.user.followers;
            const following = response.data.user.following;
            const followersAndFollowing = [...followers, ...following];
            const hash = {};
            const friendsArray = [];
            for (const id of followersAndFollowing) {
              // console.log(id);
              if (!hash[id]) {
                hash[id] = 1;
              } else {
                friendsArray.push(id);
              }
            }
            await socket.current.emit("addUser", userId);
            await socket.current.on("getUsers", (users) => {
              setOnlineUsers(
                friendsArray.filter((friendId) =>
                  users.some((onlineUser) => {
                    // console.log(u, focus)
                    return onlineUser.userId === friendId;
                  })
                )
              );
            });
            setFriends(friendsArray);
            return friends;
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    async function getOnlineUsers() {
      // console.log("asdasdasdasd")
      getFollowers();
      // await socket.current.emit("addUser", userId);
      // await socket.current.on("getUsers", (users) => {
      //   console.log(users, friends);
      //   setOnlineUsers(
      //     friendss.filter((friendId) =>
      //       users.some((onlineUser) => {

      //         return onlineUser.userId === friendId;
      //       })
      //     )
      //   );
      // });
    }

    getOnlineUsers();
  }, [userId]);

  // console.log(onlineUsers, friends);
  useEffect(() => {
    const getConversation = async () => {
      if (userId) {
        try {
          const response = await axios({
            method: "get",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            url: `${BASE_URL}/conversation/${userId}`,
          });

          if (response) {
            if (localStorage.getItem("chatId")) {
              setCurrentChat(
                response.data.find(
                  (chat) => chat._id === localStorage.getItem("chatId")
                )
              );
            } else {
              setCurrentChat(response.data[0]);
            }
            setConversations(response.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    getConversation();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          url: `${BASE_URL}/message/${currentChat?._id}`,
        });

        if (response) {
          setMessages(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const receiverId = currentChat.members.find((member) => member !== userId);
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await axios({
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        url: `${BASE_URL}/message`,
        data: {
          sender: userId,
          text: newMessage,
          conversationId: currentChat._id,
        },
      });

      if (response) {
        setMessages([...messages, response.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChatContainer className="chat-container">
      <FriendsList>
        {friends.length > 0 &&
          friends.map((friendId, index) => {
            let isOnline;
            if (onlineUsers.includes(friendId)) {
              isOnline = "isOnline";
            }
            return (
              <OnlineFriend
                key={index}
                friendId={friendId}
                isOnline={isOnline}
                userId={userId}
                setCurrentChat={setCurrentChat}
                setConversations={setConversations}
                conversations={conversations}
              />
            );
          })}
      </FriendsList>
      <div>
        <ConversationList>
          {conversations.map((conversation, index) => {
            const currentChatId = localStorage.getItem("chatId")
              ? localStorage.getItem("chatId")
              : "";
            return (
              <div
                key={index}
                className={
                  currentChatId === conversation._id ? "active-chat" : ""
                }
                onClick={() => {
                  setCurrentChat(conversation);
                  localStorage.setItem("chatId", conversation._id);
                }}
              >
                <Friend conversation={conversation} userId={userId} />
              </div>
            );
          })}
        </ConversationList>
        <MessageContainer>
          <MessageList className="message-list">
            {currentChat ? (
              <>
                {messages.map((message) => {
                  return (
                    <div
                      key={message._id}
                      className="message-comp-container"
                      ref={scrollRef}
                    >
                      <Message
                        message={message}
                        userMessage={message.sender === userId}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              "Start a conversation with one of your friends!"
            )}
          </MessageList>
          <TextBox>
            <textarea
              value={newMessage}
              name=""
              id=""
              cols="30"
              rows="3"
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button
              onClick={handleSubmit}
              disabled={isSpacesOnly(newMessage) ? true : false}
            >
              Send
            </button>
          </TextBox>
        </MessageContainer>
      </div>
    </ChatContainer>
  );
};

export default FriendsBar;
