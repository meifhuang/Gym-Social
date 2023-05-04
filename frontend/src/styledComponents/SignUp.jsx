import styled from "styled-components";

export const ContainerRow = styled.div`
  padding: 2rem;
  display: flex;
  height: 100%;

  /* & > *:nth-child(1) {
    flex: 1;
  } */
  & > * {
    flex: 1;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & h2 {
    position: absolute;
    top: 0;
    left: 0;
  }

  & h1 {
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.mobile}) {
    & {
      /* position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%); */
      /* background-color: white; */
      /* border-radius: 1rem; */
      /* padding: 1rem; */
      width: 700px;
      /* border: 1px solid red; */
      /* opacity: .5; */
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

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.xl}) {
    & {
      width: 60%;
    }
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

export const Image = styled.img`
  object-fit: cover;
  border-radius: 1rem;
  width: 60%;
  z-index: 2;
  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.mobile}) {
    & {
      display: none;
    }
  }

  @media only screen and (max-width: ${(props) =>
      props.theme.breakpoint.xl}) {
    & {
      width: 400px
    }
  }
`;

export const SignupButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  color: white;
  background-color: black;
  border: none;
  height: 40px;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2px;
  }
`;
export const GoogleButton = styled(SignupButton)`
  color: black;
  background-color: white;
  border: 2px solid black;
`;
