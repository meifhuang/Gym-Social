import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/register",
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
        console.log(response);
        navigate("/login");
      } else {
        throw Error("No response");
      }
    } catch (e) {
      console.log(e.message);
      console.log(e)
    }
  };
  return (
    <div className="App">
      <h1> Register </h1>
      <form onSubmit={registerSubmit}>
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={values.fname}
          onChange={handleInputChange}
        />

        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={values.lname}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          id="cpassword"
          name="cpassword"
          value={values.cpassword}
          onChange={handleInputChange}
        />

        <button>Sign Up</button>
      </form>
    </div>
  );
}
