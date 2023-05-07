import styled from "styled-components";

export const HomeContainer = styled.div`
  min-height: 100%;
`;

//SECTION 1
export const HeroContainer = styled.section`
  & h1 {
    font-size: calc(2rem + 2vw);
    font-weight: 700;
  }

  & .hero-subheader {
    font-size: calc(1rem + 1.5vw);
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
  }
`;

export const HeroInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8% 12%;

  & > *:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & > *:nth-child(2) {
    display: flex;
    align-items: end;
  }

  & button {
    padding: 1rem 2rem;
    border-radius: 4rem;
    border: none;
    font-size: 1rem;
    width: 250px;
    font-weight: 600;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    flex-direction: column;

    & button {
      margin-top: 1.5rem;
    }
  }
`;

export const ImageText = styled.div`
  position: absolute;
  color: white;
  right: 5%;
  top: 10%;
  font-size: calc(2rem + 1vw);
  width: 25%;
  font-family: "Poppins", sans-serif;
`;

//SECTION 2
export const ImageContainer = styled.section`
  position: relative;

  & img {
    width: 100%;
    min-height: 60vh;
    max-height: 100vh;
    object-fit: cover;
    filter: brightness(60%);
  }

  & div {
    position: absolute;
    color: white;
    right: 5%;
    top: 10%;
    font-size: calc(2rem + 1vw);
    width: 25%;
    font-family: "Poppins", sans-serif;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    flex-direction: column;

    ${ImageText} {
      left: 5%;
      top: 50%;
      width: 40%;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    flex-direction: column;

    ${ImageText} {
      left: 5%;
      top: 50%;
      width: 60%;
    }
  }
`;

//SECTION 3
export const TripleImagesHeader = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  font-size: calc(1.5rem + 2vw);
  font-weight: 700;
  flex: 0.8;
`;

export const TripleImagesSubheader = styled.div`
  font-size: calc(1rem + 1.1vw);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  font-weight: 700;
  width: 40%;
`;
export const TripleImagesContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-height: 100vh;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    ${TripleImagesSubheader} {
      padding: 0 8% 8% 8%;
    }
    ${TripleImagesHeader} {
      flex: 0.1;
      padding: 8% 8% 0 8%;
    }
  }
`;

export const TripleSelfieContainer = styled.div`
  position: relative;
  width: 50%;
`;

export const TripleImagesSubcontainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  height: 100%;
  width: 90%;
  flex: 1;
  margin-bottom: 6%;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    flex-direction: column;

    ${TripleImagesSubheader} {
      width: 100%;
    }

    ${TripleSelfieContainer} {
      position: relative;
      width: 100%;
      flex: 1;
    }
  }
`;

export const SelfieContainer = styled.div`
  position: absolute;
  
  //image 1
  &:nth-child(1) {
    left: 30%;
    bottom: 50%;
    width: 50%;
    height: 50%;
  }

  //image 2
  &:nth-child(2) {
    bottom: 5%;
    z-index: -100;
    width: 40%;
    height: 50%;
  }

  //image 3
  &:nth-child(3) {
    width: 30%;
    height: 70%;
    right: 0;
    bottom: 0;
  }

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
