import { useNavigate, Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { Spin as Hamburger } from "hamburger-react";

import {StyledNav, StyledProfileTabs, DropdownItem, ProfileDropdown, LogoFontCapitalized, LogoFont, MenuTrigger} from "../styledComponents/StyleNav"
export default function Navbar(props) {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState("");

  // if (isOpen) {
  //   setDropDown("dropdown")
  // }

  const [isActive, setIsActive] = useState("");
  console.log(isOpen);
  const { hasUserId } = useContext(AuthContext);
  console.log(hasUserId);
  return (
    <div className="main-container">
      <StyledNav>
        <LogoFontCapitalized>Gym Social</LogoFontCapitalized>
        <StyledProfileTabs>
          <div className="nav-tab">Home</div>
          {hasUserId ? (
            <>
              <div className="nav-tab">Explore</div>
              <MenuTrigger
                className="menu-trigger"
                onClick={() => setIsActive(!isActive)}
              >
                <img src="../src/images/avatar.png" alt="" />
                <div>Jacky</div>
              </MenuTrigger>
            </>
          ) : (
            <>
              <div className="nav-tab" onClick={() => navigate("/about")}>
                About
              </div>
              <div className="nav-tab" onClick={() => navigate("/signup")}>
                Sign Up
              </div>
            </>
          )}

          <ProfileDropdown className={` ${isActive ? "active" : "inactive"}`}>
            <DropdownItem>View Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </ProfileDropdown>
        </StyledProfileTabs>
      </StyledNav>
      <Outlet />
    </div>
  );
}
