import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem 1rem 3rem;
  align-items: center;
  background-color: #f7f4f4;
  position: relative;
  z-index: 1000;
  width: 100%;
  height: 10vh;

  & .hamburger-react {
    position: relative;
    margin-left: auto;
  }

  & a {
    text-decoration: none;
    color: black;
  }
`;

export const NavTabContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  @media all and (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    display: none;
  }
`;

export const NavTabDropdown = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  background-color: #f7f4f4;
  right: 0;
`;
export const NavTab = styled.div`
  & a:hover {
    transition: 0.1s;
    color: ${(props) => props.theme.colors.green};
    cursor: pointer;
  }

  & .active {
    color: ${(props) => props.theme.colors.green};
  }
`;
export const NavTab2 = styled.div`
  /* opacity: ${(props) => (props.isOpen === true ? "1" : "0")}; */
  height: ${(props) => (props.isOpen ? "50px" : "0")};
  transition: height 0.2s ease;
  overflow: hidden;
  display: flex;
  justify-content: right;
  align-items: center;
  font-weight: 700;
  margin-right: 3rem;

  & a::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: ${(props) => props.theme.colors.green};
  transition: width .15s ease-in;
}

& a:hover::after {
  width: 100%;
}

  &:last-child {
    margin-bottom: ${(props) => (props.isOpen ? "1rem" : "0")};
  }
  


  @media all and (min-width: ${(props) => props.theme.breakpoint.mobile}) {
    height: 0;
  }
`;

export const StyledProfileTabs = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  font-family: century-gothic, sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  display: none;

  /* & .nav-tabs {
    border: 1px solid red;
    display: none;
  } */

  @media all and (min-width: ${(props) => props.theme.breakpoint.mobile}) {
    display: flex;
  }

  & img {
    object-fit: cover;
  }
`;

export const DropdownItem = styled.ul`
  width: 100%;
  text-align: center;
  z-index: 2;
  padding: 0.5rem;
  text-transform: none;
  cursor: pointer;

  &:hover,
  & a:hover {
    transition: 0.1s;
    color: ${(props) => props.theme.colors.green};
    cursor: pointer;
  }

  &:nth-child(1) {
    /* border-top: 2px solid ${(props) => props.theme.colors.lightgrey}; */
    border-bottom: 2px solid ${(props) => props.theme.colors.lightgrey};
  }
`;

export const ProfileDropdown = styled.div`
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

export const LogoFont = styled.div`
  font-family: century-gothic, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 1px;
`;

export const LogoFontCapitalized = styled(LogoFont)`
  text-transform: uppercase;
  color: black;
  cursor: pointer;
`;

export const MenuTrigger = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;
