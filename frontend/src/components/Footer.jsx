import React from "react";
import {
  FooterContainer,
  FooterIconContainer,
  CollaboratorsContainer,
} from "../styledComponents/Footer";

import { HeroButton } from "../styledComponents/Home";

import { GithubIcon, JPIcon, LinkedinIcon } from "../assets/icons";
export const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-header">Gym Social Collaborators</div>
      <CollaboratorsContainer>
        <div>
          <div className="collaborator-name">Mei Huang</div>
          <FooterIconContainer>
            <div>
              <a
                href="https://www.linkedin.com/in/meifhuang5/"
                target="_blank"
                title="LinkedIn"
              >
                <LinkedinIcon />
              </a>
            </div>
            <div>
              <a
                href="https://github.com/meifhuang?tab=repositories://github.com/jpeng322?tab=repositories"
                target="_blank"
                title="Github"
              >
                <GithubIcon />
              </a>
            </div>
          </FooterIconContainer>
        </div>
        <div>
          <div className="collaborator-name">Jacky Peng</div>
          <FooterIconContainer>
            <a
              href="https://www.linkedin.com/in/jacky-peng-322p/"
              target="_blank"
              title="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <div>
              <a
                href="https://github.com/jpeng322?tab=repositories"
                target="_blank"
                title="Github"
              >
                <GithubIcon />
              </a>
            </div>
            <div>
              <a
                href="https://jacky-peng.vercel.app/"
                target="_blank"
                title="Portfolio Website"
              >
                <JPIcon />
              </a>
            </div>
          </FooterIconContainer>
        </div>
      </CollaboratorsContainer>
      {/* <HeroButton>Start Your Journey</HeroButton>
          <div>
              
          </div> */}
    </FooterContainer>
  );
};
