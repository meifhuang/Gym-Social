import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

//styling
import {
  StyledForm,
  ContainerRow,
  ContainerColumn,
  FormContainer,
  FormDiv,
  ErrorMessage,
  Image,
  AuthButton,
  GoogleButton,
  FacebookButton,
  AuthRedirect,
} from "../styledComponents/Auth";

//images
import SignupImage from "../images/gym_social_on_phone.png";
import { GoogleIcon, FacebookIcon } from "../assets/icons";

export default function Signup() {
  const BASE_URL = import.meta.env.VITE_URL
  const navigate = useNavigate();

  const [signupPart, setSignupPart] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleGoogleLogin = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const checkEmail = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/emailcheck`,
        data: {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
        },
      });
      if (response) {
        setSignupPart(1);
        setErrorMessage("");
      }
    } catch (e) {
      setErrorMessage(e.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `${BASE_URL}/signup`,
        data: {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          username: values.username,
          password: values.password,
          cpassword: values.cpassword,
        },
      });

      if (response) {
        
        navigate("/login");
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e.message);
      console.log(e);
      setErrorMessage(e.response.data.message);
    }
  };
  return (
    <ContainerColumn>
      <ContainerRow>
        <FormContainer>
          <h2 onClick={() => navigate("/")}>Gym Social</h2>
          <StyledForm>
            <h1>Join the Community!</h1>
            {signupPart === 0 ? (
              <>
                <FormDiv signupPart={signupPart}>
                  {/* <label htmlFor="fname">First Name:</label> */}
                  <input
                    className="fadeout"
                    type="text"
                    id="fname"
                    name="fname"
                    value={values.fname}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                </FormDiv>
                <FormDiv signupPart={signupPart}>
                  <input
                    className="fadeout"
                    type="text"
                    id="lname"
                    name="lname"
                    value={values.lname}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </FormDiv>
                <FormDiv signupPart={signupPart}>
                  <input
                    className="fadeout"
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </FormDiv>
              </>
            ) : (
              <>
                <FormDiv signupPart={signupPart}>
                  <input
                    className="slide-left"
                    type="text"
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                  />
                </FormDiv>
                <FormDiv signupPart={signupPart}>
                  <input
                    className="slide-left"
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                </FormDiv>
                <FormDiv signupPart={signupPart}>
                  <input
                    className="slide-left"
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    value={values.cpassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                  />
                </FormDiv>
              </>
            )}
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <AuthButton
              onClick={(e) => {
                signupPart === 0 ? checkEmail(e) : signupSubmit(e);
              }}
            >
              Create Account{" "}
              {signupPart === 0 && (
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="css-i6dzq1"
                  >
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </span>
              )}
            </AuthButton>
            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <span>
                <GoogleIcon />
              </span>
              Sign Up with Google
            </GoogleButton>
            {/* <FacebookButton>
              <span>
                <FacebookIcon />
              </span>
              Sign Up with Facebook
            </FacebookButton> */}
            <AuthRedirect>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </AuthRedirect>
          </StyledForm>
        </FormContainer>
        <Image
          // src={SignupImage}
          src="images/gym_social_on_phone.png"
          alt="loading" />
      </ContainerRow>
    </ContainerColumn>
  );
}
