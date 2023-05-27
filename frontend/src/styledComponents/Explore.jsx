import styled from "styled-components";

export const ExploreContainer = styled.main`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 5% 10%;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
    margin-top: 2rem;
  }
`;
export const UserCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 5%;
`;

export const UserCard = styled.div`
  border: 2px solid #dadde1;
  /* border: 1px solid ${(props) => props.theme.colors.lightgrey}; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  border-radius: 0.5rem;
  /* background-color: ${(props) => props.theme.colors.lightgrey}; */
  /* box-shadow: 0 0 2px;; */

  & img {
    width: max(150px, 10vw);
    height: max(150px, 10vw);
    /* border: 1px solid red; */
    border-radius: 50%;
    object-fit: cover;
  }

  & .usercard-bio {
    /* border: 1px solid red; */
    /* min-height: 50px; */
    max-height: 50px;
    /* padding-inline: 1rem; */
    width: 80%;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & button {
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    letter-spacing: 1.5px;
    color: white;
    font-weight: bold;
    font-size: 0.75rem;
    border: 2px solid ${(props) => props.theme.colors.green};
    background-color: ${(props) => props.theme.colors.green};
    transition: 0.2s;
    background: transparent;
    border: 2px solid ${(props) => props.theme.colors.green};
    color: black;
  }

  & button:hover {
    background: transparent;
    border: 2px solid ${(props) => props.theme.colors.green};
    color: black;
    border: 2px solid ${(props) => props.theme.colors.green};
    background-color: ${(props) => props.theme.colors.green};
    color: white;
  }
`;
