import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../src/AuthContext";
import { Spin as Hamburger } from "hamburger-react";

import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  background-color: #778899;
  justify-content: space-between;
  padding: 2rem 4rem;
  position: relative;
  /* border: 1px solid red; */
  align-items: center;

  @media (min-width: ${(props) => props.theme.mobile}) {
    /* background-color: red; */
  }
`;

const StyledProfileTabs = styled.div`
  display: flex;
  gap: 1.5rem;
  color: white;
  /* border: 1px solid red; */
  align-items: center;
  justify-content: center;
  font-family: century-gothic, sans-serif;
  text-transform: uppercase;
  /* letter-spacing: 1px; */
  font-weight: 600;
`;

const DropdownItem = styled.ul`
  /* border: 1px solid red; */
  width: 100%;
  text-align: center;
  z-index: 2;
  padding: 0.5rem;
  text-transform: none;

  &:nth-child(even) {
    border-top: 2px solid ${(props) => props.theme.colors.lightgrey};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightgrey};
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 120px;
  right: 20px;
  background-color: #fff;
  border-radius: var(--border-radius);
  padding: 10px 20px;
  width: 200px;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    background: #f6f6f6;
    transform: rotate(45deg);
  }

  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: 0.3s ease;
  }

  &.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: 0.3s ease;
  }
`;



const LogoFont = styled.div`
  font-family: century-gothic, sans-serif;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 1px;

`;

const LogoFontCapitalized=styled(LogoFont)`
  text-transform: uppercase;
  color: #f6f7f9;
`

const MenuTrigger = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  justify-content: center;
  align-items: center;
`
export default function Navbar(props) {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState("");

  // if (isOpen) {
  //   setDropDown("dropdown")
  // }

  const [isActive, setIsActive] = useState("");
  console.log(isOpen);
  return (
    <StyledNav>
      <LogoFontCapitalized>Gym Social</LogoFontCapitalized>
      <StyledProfileTabs>
        <div>Home</div>
        <div>Explore</div>
        <MenuTrigger
          className="menu-trigger"
          onClick={() => setIsActive(!isActive)}
        >
          <img src="../src/images/avatar.png" alt="" />
          <div>Jacky</div>
        </MenuTrigger>
        <ProfileDropdown className={` ${isActive ? "active" : "inactive"}`}>
          <DropdownItem>View Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </ProfileDropdown>
      </StyledProfileTabs>

      {/* <div className="nav-tabs">
        <div className="nav-expand ">
          <div>Home</div>
          <div>About </div>
          <div> Register</div>
        </div>
        <Hamburger toggled={isOpen} toggle={setOpen}></Hamburger>
        <div className={isOpen ? "dropdown" : "dropdown hidden"}>
          <div className="">Home</div>
          <div className="">About </div>
          <div className=""> Register</div>
        </div>
      </div> */}
    </StyledNav>
  );
}
