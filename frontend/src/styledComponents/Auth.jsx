import styled from "styled-components";

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const ContainerRow = styled.div`
  /* margin: 3rem; */
  position: relative;
  /* padding: 2rem; */
  display: flex;
  height: 100%;
  flex: 1;

  /* & > *:nth-child(1) {
    flex: 1;
  } */
  & > * {
    flex: 1;
  }
`;

export const ContainerRowReverse = styled(ContainerRow)`
  flex-direction: row-reverse;
  /* border: 1px solid red; */
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* border: 1px solid red; */
  margin: 2rem;

  & h2 {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  & h1 {
    margin-bottom: 1rem;
  }

  & .margin-left {
    /* margin-left: 2rem; */
  }

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.mobile}) {
    & {
      width: 700px;
    }

    /* & h2 {
      margin-left: auto
    } */
  }
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
  /* border: 1px solid red; */

  @media only screen and (max-width: ${(props) => props.theme.breakpoint.xxl}) {
    & {
      width: 50%;
    }
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoint.xl}) {
    & {
      width: 60%;
    }
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    & {
      width: 70%;
    }
  }

  & h1 {
    /* text-align: center; */
  }
`;

export const FormDiv = styled.div`
  /* border: 1px solid red; */

  & input {
    border: none;
    border-bottom: 1px solid grey;
    width: 100%;
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
    /* margin-left: 50%; */
    /* animation: 1s slide-left; */
  }

  & input:active {
    border: none;
  }

  & input:focus {
    outline: none;
    border-bottom: 1px solid grey;
  }

  .slide-left {
    animation: 0.5s slide-left ease;
  }
  @keyframes slide-left {
    from {
      margin-left: 70%;
    }
    to {
      margin-left: 0%;
    }
  }

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.mobile}) {
    .slide-left {
      animation: 0.4s slide-left ease;
    }
    @keyframes slide-left {
      from {
        margin-left: 30%;
      }
      to {
        margin-left: 0%;
      }
    }
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  /* border: 1px solid red; */
  color: #ff0033;
`;

export const Image = styled.img`
  object-fit: cover;
  border-radius: 1rem;
  margin: 2rem;
  width: 55%;
  z-index: 2;
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.mobile}) {
    & {
      display: none;
    }
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoint.xl}) {
    & {
      width: 300px;
    }
  }
`;

export const AuthButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: white;
  background-color: black;
  border: none;
  height: 40px;
  cursor: pointer;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2px;
  }
`;
export const GoogleButton = styled(AuthButton)`
  color: black;
  background-color: white;
  border: 2px solid black;
  position: relative;

  & span svg {
    width: 1.25rem;
    height: 100%;
  }

  & span {
    position: absolute;
    left: 1rem;
    height: 1.5rem;
  }
`;

export const FacebookButton = styled(AuthButton)`
  color: white;
  position: relative;
  background-color: #3b5998;

  & span svg {
    width: 1.5rem;
    fill: white;
    background-color: #3b5998;
  }

  & span {
    position: absolute;
    left: 1rem;
    height: 1.5rem;
  }
`;

export const AuthRedirect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    margin-left: 0.5rem;
    color: #789b78;
  }

  & span:hover {
    transition: all 0.2s;
    /* text-decoration: underline; */
    cursor: pointer;
    color: #95c295;
  }
`;
