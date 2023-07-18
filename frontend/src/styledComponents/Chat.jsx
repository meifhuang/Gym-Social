import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  height: 100%;


  & > *:first-child {
    width: 20%;
  }

  & .active-chat {
    background-color: rgb(173, 194, 223);
  }
`;

export const FriendContainer = styled.div``;

export const FriendDiv = styled.div`
  &:hover {
    background-color: rgba(218, 221, 225, 0.377);
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid blue;
`;

export const MessageList = styled.div`
  padding: 2rem;
  /* border: 1px solid blue; */
  overflow: scroll;
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  & .message-comp-container {
    /* border: 1px solid purple; */
    display: flex;
    justify-content: start;
  }
  & .messageTop {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    letter-spacing: .5px;
    font-size: 1.25rem;
    background-color: rgb(204, 202, 202);
  }
 
  & .user .messageTop {
    background-color: ${(props) => props.theme.colors.green};
 
  }
  & .timestamp {
    font-size: 0.75rem;
    font-weight: 400;
  }

  & .user {
    /* border: 1px solid red; */
    max-width: 60%;
    text-align: end;
    margin-left: auto;
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
  & textarea {
    flex: 1;
    overflow: hidden;
    resize: none;
  }
  & button {
    height: 100%;
    width: 200px;
  }
`;
