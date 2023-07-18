import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Friend from "./Friend";
import Message from "./Message";
import axios from "axios";
import { ChatContainer } from "../styledComponents/Chat";
const FriendsBar = () => {
  const { userId } = useContext(AuthContext);
  console.log(userId);
  const BASE_URL = import.meta.env.VITE_URL;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
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
          console.log(response);
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

  console.log(currentChat);
  return (
    <ChatContainer className="chat-container">
      <div>
        {conversations.map((conversation, index) => {
          return (
            <div key={index} onClick={() => setCurrentChat(conversation)}>
              <Friend conversation={conversation} userId={userId} />
            </div>
          );
        })}
      </div>
      {currentChat ? (
        <div className="message-container">
          {messages.map((message) => {
            return (
              <div ref={scrollRef}>
                <Message
                  message={message}
                  userMessage={message.sender === userId}
                />
              </div>
            );
          })}
        </div>
      ) : (
        "Start a conversation with one of your friends!"
      )}
    </ChatContainer>
  );
};

export default FriendsBar;
