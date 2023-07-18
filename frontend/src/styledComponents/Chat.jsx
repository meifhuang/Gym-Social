import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  height: 100%;
  border: 1px solid red;

  & > *:first-child {
    border: 1px solid red;
    width: 20%;
  }
`;


export const FriendContainer = styled.div`
    
`

export const FriendDiv = styled.div`
    
    &:hover {
        background-color: rgba(218, 221, 225, 0.377);
    }
`