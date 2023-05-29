import styled from "styled-components";

export const TabBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  word-break: break-all;
  /* position: relative; */
  width: 100%;

`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;


  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    /* justify-content: start; */
  }
`;

export const CreateWorkoutContainer = styled.div`
  position: absolute;
  top: 0;
  margin-top: 1rem;
  right: 0;
  text-align: center;
  & button {
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  & input {
    text-align: center;
    width: 120px;
  }

  & svg {
    color: #a19f9f;
    /* margin-top: .25rem; */
    /* border: 1px solid red; */
    background: none;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    position: relative;
    margin-bottom: 1rem;
  }
`;


export const TabButton = styled.button`
  /* border: none; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: min(3vw, 1rem);
  flex-direction: column;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.xxs}) {
    flex-direction: column;
  }
`;

export const TabIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: min(5vw, 1.25rem);
  }
`;
