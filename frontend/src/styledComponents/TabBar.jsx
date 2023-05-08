import styled from "styled-components";

export const TabBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  word-break: break-all;
  /* position: relative; */
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  /* position: relative; */
  width: 100%;
`;

export const CreateWorkoutContainer = styled.div`
position: absolute;
/* margin-left: auto; */
/* margin-right: auto; */
/* left: 0; */
/* top: 0; */
/* bottom: 0; */
top: 0;
margin-top: .5rem;
right: 0;
text-align: center;
/* border: 1px solid red; */
/* display: flex;
justify-content: center;
align-items: center; */
& button {
    background: none;
}
& form {
    display: flex;
justify-content: center;
align-items: center;
gap: .5rem;

}
& input {
    text-align: center;
}

& svg {
    color: #a19f9f;
    margin-top: .25rem;
    /* border: 1px solid red; */
    background: none;
}
`;
// export const Tab = styled.div`
//   padding: 0.75rem;
//   text-align: center;
//   background: white;
//   cursor: pointer;
//   box-sizing: content-box;
//   position: relative;
//   outline: none;
//   font-size: 1rem;
//   color: #a19f9f;

// `;

export const TabButton = styled.button`
  /* border: none; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

export const TabIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 20px;
  }
`;
