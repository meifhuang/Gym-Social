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

  const { hasUserId, hasToken, setHasToken, userId } = useContext(AuthContext);
  console.log(hasUserId, "SADSAD HAS USER ID");

  const logout = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:4000/logout",
      });
      if (response) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        setHasToken("");
        setIsActive(false);
        navigate("/");
      } else {
        throw Error("no response");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const viewProfile = async (userId) => {
    navigate(`/profile/${userId}`);
  };

  const viewExplore = async (userId) => {
    navigate(`/explore`);
  };

  function gotoNewsFeed() {
    navigate("/newsfeed");
  }

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
          {hasToken ? (
            <>
              <NavTab className="nav-tab" onClick={gotoNewsFeed}>
                HOME
              </NavTab>
              <NavTab className="nav-tab" onClick={viewExplore}>Explore</NavTab>
              <MenuTrigger
                className="menu-trigger"
                onClick={() => setIsActive(!isActive)}
              >
                <img src="../src/images/avatar.png" alt="" />
              </MenuTrigger>
            </>
          ) : (
            <NavTabContainer>
              <NavTab className="nav-tab">Home</NavTab>
              <NavTab className="nav-tab" onClick={() => navigate("/about")}>
                About
              </NavTab>
              <NavTab className="nav-tab" onClick={() => navigate("/login")}>
                Login
              </NavTab>
            </NavTabContainer>
          )}

          <ProfileDropdown className={` ${isActive ? "active" : "inactive"}`}>
            <DropdownItem onClick={() => viewProfile(userId)}>
              View Profile
            </DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
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
