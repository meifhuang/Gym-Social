import { useNavigate, Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Spin as Hamburger } from "hamburger-react";

import {
  StyledNav,
  StyledProfileTabs,
  DropdownItem,
  ProfileDropdown,
  LogoFontCapitalized,
  LogoFont,
  MenuTrigger,
  NavTabContainer,
  NavTab,
  NavTab2,
  NavTabDropdown,
} from "../styledComponents/StyleNav";
export default function Navbar(props) {

  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);

  // const [dropDown, setDropDown] = useState("");

  // const [isDropped, setIsDropped] = useState("");

  const [isActive, setIsActive] = useState("");

  const { hasUserId } = useContext(AuthContext);

  return (
    <div className="main-container">
      <StyledNav>
        <LogoFontCapitalized>Gym Social</LogoFontCapitalized>
        <Hamburger
          className="hamburger"
          // onClick={() => setOpen(!isOpen)}
          toggled={isOpen}
          toggle={setOpen}
        ></Hamburger>
        <StyledProfileTabs>
          {hasUserId ? (
            <>
              <NavTab className="nav-tab">Explore</NavTab>
              <MenuTrigger
                className="menu-trigger"
                onClick={() => setIsActive(!isActive)}
              >
                <img src="../src/images/avatar.png" alt="" />
                <div>Jacky</div>
              </MenuTrigger>
            </>
          ) : (
            <NavTabContainer>
              <NavTab className="nav-tab">Home</NavTab>
              <NavTab className="nav-tab" onClick={() => navigate("/about")}>
                About
              </NavTab>
              <NavTab className="nav-tab" onClick={() => navigate("/signup")}>
                Sign Up
              </NavTab>
            </NavTabContainer>
          )}

          <ProfileDropdown className={` ${isActive ? "active" : "inactive"}`}>
            <DropdownItem>
              View Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </ProfileDropdown>
        </StyledProfileTabs>
        {/* <NavTabDropdown isOpen={isOpen}>
          <NavTab className={"nav-tab "}>Home</NavTab>
          <NavTab className={"nav-tab "} onClick={() => navigate("/about")}>
            About
          </NavTab>
          <NavTab className={"nav-tab "} onClick={() => navigate("/signup")}>
            Sign Up
          </NavTab>
        </NavTabDropdown> */}
        <NavTabDropdown>
          <NavTab2 isOpen={isOpen} className={"nav-tab "}>
            <span>Home</span>
          </NavTab2>
          <NavTab2
            isOpen={isOpen}
            className={"nav-tab "}
            onClick={() => navigate("/about")}
          >
            <span>About</span>
          </NavTab2>
          <NavTab2
            isOpen={isOpen}
            className={"nav-tab "}
            onClick={() => navigate("/signup")}
          >
            <span>Sign Up</span>
          </NavTab2>
        </NavTabDropdown>
      </StyledNav>

      <Outlet />
    </div>
  );
}
