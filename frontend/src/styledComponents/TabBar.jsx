import styled from "styled-components";

export const TabBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  word-break: break-all;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const Tab = styled.div`
  padding: 0.75rem;
  text-align: center;
  background: white;
  cursor: pointer;
  box-sizing: content-box;
  position: relative;
  outline: none;
  font-size: 1rem;
  color: #a19f9f;

`;

export const TabButton = styled.button`
  /* border: none; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;


`;

export const TabIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 20px;
  }
`;
