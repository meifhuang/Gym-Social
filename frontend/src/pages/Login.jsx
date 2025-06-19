import { useNavigate, redirect } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
//styling
import {
  StyledForm,
  ContainerRowReverse,
  ContainerColumn,
  FormContainer,
  FormDiv,
  Image,
  AuthButton,
  GoogleButton,
  FacebookButton,
  AuthRedirect,
  ErrorMessage,
} from "../styledComponents/Auth";

//images
// import LoginImage from "images/gym_social_login.png";

//
import { FacebookIcon, GoogleIcon } from "../assets/icons.jsx";

export default function Login(props) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const FRONT_URL = import.meta.env.FRONT_URL;
  const { message } = props;
  const { setHasToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  }, [isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleGoogleLogin = async () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  // const handleFacebookLogin = async () => {
  //   // console.log("huh");
  //   window.open(`${BASE_URL}/auth/facebook`, "_self");
  //   // try {
  //   //   const response = await axios({
  //   //     method: "get",
  //   //     url: "http://localhost:4000/auth/google/callback",
  //   //   });
  //   //   if (response) {
  //   //     console.log(response);
  //   //     localStorage.setItem("token", response.data.token);
  //   //     localStorage.setItem("id", response.data.userId);
  //   //   } else {
  //   //     console.log("no response");
  //   //   }
  //   // } catch (e) {
  //   //   console.log(e.message);
  //   // }
  // };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username: values.username,
        password: values.password,
      });
      if (response) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.userId);
        setHasToken(response.data.token);
        setErrorMessage("");
        setIsLoading(false);
        window.location.href = `/profile/${data.userId}`;
      } else {
        console.log("Login failed");
      }
    } catch (e) {
      setErrorMessage(e.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 10000);
    }
  };
  return (
    <ContainerColumn>
      <ContainerRowReverse>
        <FormContainer>
          <h2 className="margin-left" onClick={() => navigate("/")}>
            Gym Social
          </h2>
          <StyledForm
          // onSubmit={signupSubmit}
          >
            <h1>Welcome Back!</h1>

            {/* <>
              <FormDiv>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
              </FormDiv>
              <FormDiv>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </FormDiv>
            </> */}

            {/* <ErrorMessage>{errorMessage}</ErrorMessage> */}
            <AuthButton
              type="button"
              onClick={handleGoogleLogin}
            >
              Sign Up
            </AuthButton>
            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <span>
                <GoogleIcon />
              </span>
              Login with Google
            </GoogleButton>
            {/* <FacebookButton type="button" onClick={handleFacebookLogin}>
              <span>
                <FacebookIcon />
              </span>
              Login with Facebook
            </FacebookButton> */}
            {/* <AuthRedirect>
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </AuthRedirect> */}
          </StyledForm>
        </FormContainer>
        <Image
          // src={LoginImage}
          src="images/gym_social_login.PNG"
          alt="loading"
        />
      </ContainerRowReverse>
    </ContainerColumn>
  );
}
