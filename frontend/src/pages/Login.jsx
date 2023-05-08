import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect} from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

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
import LoginImage from "../images/gym_social_login.png";

//
import { FacebookIcon, GoogleIcon } from "../assets/icons.jsx";


export default function Login(props) {
  const { message } = props;
  const { username, setUsername, token, setToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username: values.username,
        password: values.password,
      });
      if (response) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.userId);
        setErrorMessage("");
        return navigate("/newsfeed");
      } else {
        console.log("Login failed");
      }
    } catch (e) {
      // setErrorMessage(e.response.data.message);
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

            <>
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
            </>

            <ErrorMessage>{errorMessage}</ErrorMessage>
            <AuthButton
              onClick={(e) => {
                loginSubmit(e);
              }}
            >
              Login
            </AuthButton>
            
            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <span>
                <GoogleIcon />
              </span>
              Login with Google
            </GoogleButton>
            <FacebookButton>
              <span>
                <FacebookIcon />
              </span>
              Login with Facebook
            </FacebookButton>
            <AuthRedirect>
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </AuthRedirect>
            </StyledForm>
        </FormContainer>
        <Image src={LoginImage} alt="loading" />
      </ContainerRowReverse>
    </ContainerColumn>
  );
}
