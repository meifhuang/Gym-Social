import React from "react";
import { useNavigate } from "react-router-dom";

//styled
import {
  HomeContainer,
  HeroContainer,
  HeroInfo,
  ImageContainer,
  TripleImagesContainer,
  SelfieContainer,
  TripleImagesSubcontainer,
  TripleImagesSubheader,
  TripleImagesHeader,
  TripleSelfieContainer,
  ImageText,
  HeroButton
} from "../styledComponents/Home";

//components 
import { Footer } from "../components/Footer";

//images
import HomeImage from "../images/gym_social_home2.jpg";
import Selfie_One from "../images/selfie_1.jpg";
import Selfie_Two from "../images/selfie_2.jpg";
import Selfie_Three from "../images/selfie_3.jpg";
export default function Homepage(props) {
  const { message } = props;

  const navigate = useNavigate();

  return (
    <HomeContainer>
      <HeroContainer>
        <HeroInfo>
          <div>
            <h1>Track your fitness journey - simply.</h1>
            <div>
              <div className="hero-subheader"> Show off your progress.</div>
              <div className="hero-subheader">Share your workouts.</div>
            </div>
          </div>
          <div>
            <HeroButton className="sign-up" onClick={()=> navigate('/login')}>Start Your Journey</HeroButton>
          </div>
        </HeroInfo>
      </HeroContainer>
      <ImageContainer>
        <img src={HomeImage} alt="" />
        <ImageText>A community to support, grow, and learn.</ImageText>
      </ImageContainer>
      <TripleImagesContainer>
        <TripleImagesHeader className="">
          Post your progress on Gym Social.
        </TripleImagesHeader>
        <TripleImagesSubcontainer>
          <TripleImagesSubheader className="secondary_fs">
            Gym Social creates a support enviroment allowing members to
            celebrate fitness milestones, accomplishments, and achievements!
          </TripleImagesSubheader>
          <TripleSelfieContainer>
            <SelfieContainer>
              <img src={Selfie_One} alt="" />
            </SelfieContainer>
            <SelfieContainer>
              <img src={Selfie_Two} alt="" />
            </SelfieContainer>
            <SelfieContainer>
              <img src={Selfie_Three} alt="" />
            </SelfieContainer>
          </TripleSelfieContainer>
        </TripleImagesSubcontainer>
      </TripleImagesContainer>
      <Footer />
    </HomeContainer>
  );
}
