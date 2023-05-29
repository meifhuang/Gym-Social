import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: black;
  color: white;
  /* height: 10vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  gap: 2rem;

  & svg {
    width: 1.75rem;
    height: 1.75rem;
    /* border: 1px solid red; */
    fill: white;
  }

  & .footer-header {
    font-size: calc(1.5rem + .7vw) ;
  }
`;

export const FooterIconContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  & svg {
    cursor: pointer;
    transition: 0.3s;
  }

  & svg:hover {
    fill: ${(props) => props.theme.colors.green};
    /* transform: scale(1.10); */
    animation: scale 1.5s infinite ;
  }






@keyframes scale {
  0% {
    transform: scale(1.05) ;
  }

  50% {
    transform: scale(0.98);
  }
  /* 75% {
    transform: scale(1.10);
  } */
  100% {
    transform: scale(1.05);
  }
}


`;

export const CollaboratorsContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  width: min(500px, 100%);


  & > * {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .collaborator-name {
    font-size: 1.25rem;
  }
`;
