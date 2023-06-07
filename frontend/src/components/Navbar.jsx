import { useNavigate, Outlet, Link, NavLink } from "react-router-dom";
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
  const BASE_URL = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);

  const [isActive, setIsActive] = useState("");

  const {
    hasUserId,
    hasToken,
    setHasToken,
    userId,
    userPicUrl,
    setUserPicUrl,
  } = useContext(AuthContext);


  const logout = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${BASE_URL}/logout`,
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

  return (
    <div className="main-container">
      <StyledNav>
        <LogoFontCapitalized>
          <Link to="/" className="nav-link">
            Gym Social
          </Link>
        </LogoFontCapitalized>
        <Hamburger
          className="hamburger"
          // onClick={() => setOpen(!isOpen)}
          toggled={isOpen}
          toggle={setOpen}
        ></Hamburger>
        <StyledProfileTabs>
          {/* <div className="nav-tabs"> */}
          {hasToken ? (
            <>
              <NavTab className="nav-tab">
                <NavLink to="/newsfeed">HOME</NavLink>
              </NavTab>
              <NavTab className="nav-tab">
                <NavLink to="/explore">EXPLORE</NavLink>
              </NavTab>
              <MenuTrigger
                className="menu-trigger"
                onClick={() => setIsActive(!isActive)}
              >
                <img src={userPicUrl} alt="" />
              </MenuTrigger>
            </>
          ) : (
            <NavTabContainer>
              <NavTab className="nav-tab">
                <NavLink to="/">HOME</NavLink>
              </NavTab>
              {/* <NavTab className="nav-tab">
                <NavLink to="/about">ABOUT</NavLink>
              </NavTab> */}
              <NavTab className="nav-tab">
                <NavLink to="/login">LOGIN</NavLink>
              </NavTab>
            </NavTabContainer>
          )}
          {/* </div> */}

          <ProfileDropdown className={` ${isActive ? "active" : "inactive"}`}>
            <DropdownItem>
              <Link to={`/profile/${localStorage.getItem("id")}`}>
                View Profile
              </Link>
            </DropdownItem>
            {/* <DropdownItem>Edit Profile</DropdownItem> */}
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
          {hasToken ? (
            <>
              <NavTab2 isOpen={isOpen} className={"nav-tab "}>
                <Link to={`/profile/${localStorage.getItem("id")}`}>
                  {" "}
                  View Profile
                </Link>
              </NavTab2>
              <NavTab2 isOpen={isOpen} className={"nav-tab "}>
                <Link to={"/newsfeed"}> Home</Link>
              </NavTab2>
              <NavTab2 isOpen={isOpen} className={"nav-tab "}>
                <NavLink to="/explore"> Explore</NavLink>
              </NavTab2>
            </>
          ) : (
            <>
              <NavTab2 isOpen={isOpen} className={"nav-tab "}>
                <span>Home</span>
              </NavTab2>
              {/* <NavTab2
                isOpen={isOpen}
                className={"nav-tab "}
                onClick={() => navigate("/about")}
              >
                <span>About</span>
              </NavTab2> */}
              <NavTab2
                isOpen={isOpen}
                className={"nav-tab "}
                onClick={() => navigate("/signup")}
              >
                <span>Sign Up</span>
              </NavTab2>
            </>
          )}
        </NavTabDropdown>
      </StyledNav>

      <Outlet />
    </div>
  );
}
