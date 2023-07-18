import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Friend from "./Friend";
import Message from "./Message";
import axios from "axios";
import { io } from "socket.io-client";
import OnlineFriend from "./OnlineFriend";
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
  const socket = useRef();
  const scrollRef = useRef();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
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
          const friends = [];
          for (const id of followersAndFollowing) {
            console.log(id);
            if (!hash[id]) {
              hash[id] = 1;
            } else {
              friends.push(id);
            }
          }

          setFriends(friends);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getFollowers();
  }, [userId]);

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
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(friends.filter((f) => users.some((u) => u.userId === f)));
    });
  }, [userId]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios({
          method: "get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          url: `${BASE_URL}/conversation/${userId}`,
        });

        if (response) {
          //   console.log(response);
          setCurrentChat(response.data[0]);
          setConversations(response.data);
        }
      } catch (e) {
        console.log(e);
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
        {friends.map((userId) => {
          if (onlineUsers.includes(userId)) {
            return <OnlineFriend userId={userId} isOnline="isOnline" />;
          } else {
            return <OnlineFriend userId={userId} />;
          }
        })}
      </FriendsList>
      <div>
        <ConversationList>
          {conversations.map((conversation, index) => {
            return (
              <div
                key={index}
                className={currentChat === conversation ? "active-chat" : ""}
                onClick={() => setCurrentChat(conversation)}
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
                    <div className="message-comp-container" ref={scrollRef}>
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
            <button onClick={handleSubmit}>Send</button>
          </TextBox>
        </MessageContainer>
      </div>
    </ChatContainer>
  );
};

export default FriendsBar;