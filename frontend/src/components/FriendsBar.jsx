import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Friend from "./Friend";
import Message from "./Message";
import axios from "axios";
import {
  ChatContainer,
  MessageContainer,
  TextBox,
  MessageList,
} from "../styledComponents/Chat";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const receiverId = currentChat.members.find((member) => member !== userId);

    // socket.current.emit("sendMessage", {
    //   senderId: userId,
    //   receiverId,
    //   text: newMessage,
    // });

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

      console.log(response);
      if (response) {
        setMessages([...messages, response.data]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    </ChatContainer>
  );
};

export default FriendsBar;
