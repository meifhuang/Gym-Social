import styled from "styled-components";

export const StyledNav = styled.nav`
  display: flex;
  /* background-color: #778899; */
  justify-content: space-between;
  padding: 2rem 3rem 0rem 3rem;
  position: relative;
  /* border: 1px solid red; */
  align-items: center;

  @media (min-width: ${(props) => props.theme.mobile}) {
    /* background-color: red; */
  }
`;

export const StyledProfileTabs = styled.div`
  display: flex;
  gap: 1.5rem;
  color: white;
  color: black;
  /* border: 1px solid red; */
  align-items: center;
  justify-content: center;
  font-family: century-gothic, sans-serif;
  text-transform: uppercase;
  /* letter-spacing: 1px; */
  font-weight: 600;

  @media all and (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    & .nav-tab {
      display: none;
      border: 1px solid red;
    }
  }
`;

export const DropdownItem = styled.ul`
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

export  const ProfileDropdown = styled.div`
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
`;

export const MenuTrigger = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;