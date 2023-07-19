import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;

  & > *:nth-child(2) {
    display: flex;
    height: 75vh;
  }
  & .active-chat {
    background-color: ${(props) => props.theme.colors.darkgrey};
    border-bottom:  rgb(147, 180, 224)
    /* border-radius: 0.5rem; */
  }
`;

export const FriendsList = styled.div`
  width: 100%;
  height: 15vh;
  border: 1px solid rgba(186, 187, 189, 0.377);
  /* padding-inline: 1.5rem; */
  padding: 1rem 2rem;
  gap: 1rem;
  font-size: 0.75rem;
  display: flex;

  * .image-status {
    position: relative;

    /* width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%; */
  }
  & img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
`;

export const FriendsListFriend = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
  border-radius: 0.5rem;

  /* box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.452); */

  &:hover {
    background-color: ${(props) => props.theme.colors.lightgrey};
  }
  & .name-status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: .5rem; */
  }
  & .dot {
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(83, 83, 83);
    /* margin-right: 6px; */
    right: 8px;
    bottom: 4px;
  }

  & .dot.isOnline {
    background-color: green;
  }
`;

export const ConversationList = styled.div`
  /* border: 1px solid red; */
  border-width: 1px;
  border-right: 1px solid rgba(186, 187, 189, 0.377);

  & > * {
    /* border: 1px solid red; */
    border-bottom: 1px solid rgba(186, 187, 189, 0.377);
  }

  & > * .active-chat {
    border-bottom: ;
  }
`;

export const FriendDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  /* border-radius: 0.5rem; */
  /* border: 1px solid red; */
  background-color: rgba(218, 221, 225, 0.377);

  &:hover {
    background-color: rgba(218, 221, 225, 0.377);
  }

  & img {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MessageList = styled.div`
  /* border: 2px solid red; */
  padding: 2rem calc(1rem + 2vw);
  /* border: 1px solid blue; */
  overflow: scroll;
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  gap: 1rem;
  overflow-y: auto;
  & .message-comp-container {
    /* border: 1px solid purple; */
    display: flex;
    justify-content: start;
    /* width: 60%; */
  }

  & .message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 60%;
  }

  & .message.user {
    flex-direction: row-reverse;
  }

  & .message img {
    width: 2.5;
    height: 2.5rem;
  }

  & .timestamp {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    font-weight: 900;
  }

  & .user .messageTop {
    background-color: ${(props) => props.theme.colors.green};
  }

  & .user {
    /* border: 1px solid red; */
    max-width: 60%;
    text-align: end;
    margin-left: auto;
  }
`;

export const MessageAndTimestamp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  /* border: 1px solid red; */
  /* max-width: 200px; */
  /* height: 300px; */
  word-wrap: break-word;

  & p {
    word-break: break-all;
    white-space: normal;
  }
`;

export const MessageTop = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.isUser ? props.theme.colors.green : "rgb(204, 202, 202)"};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  font-size: 1.15rem;
  /* border: 1px solid red; */
  /* max-width: 200px; */
  /* overflow: wrap; */
  white-space: normal;
  word-wrap: break-word;
  /* background-color: rgb(204, 202, 202); */

  & .messageText {
    display: flex;
    /* border: 1px solid red; */
    /* height: 300px; */
  }
`;
export const TextBox = styled.div`
  width: 100%;
  /* position: absolute; */
  /* bottom: 0; */
  display: flex;
  flex: 1;
  /* height: 100px; */
  /* align-self: end; */
  height: 12vh;
  & textarea {
    flex: 1;
    overflow: hidden;
    resize: none;
    font-size: 1rem;
    border: none;
    border-top: 1px solid rgba(186, 187, 189, 0.377);
    padding: 1rem;

    outline: none;

    /* -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none; */
  }
  & button {
    height: 100%;
    width: 200px;
    font-size: 1.25rem;
    transition: 0.1s;
  }

  /* & button:hover {
    background-color: rgb(204, 202, 202);
  } */

  & button:not([disabled]):hover {
    background-color: rgb(204, 202, 202);
  }   
`;
