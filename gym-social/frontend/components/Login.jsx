import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Login(props) {
    const { message, currentUser } = props
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
        console.log(values);
    };

    const loginSubmit = async (e) => {
        // alert("asdasd");
        // console.log("registered");
        e.preventDefault();
        try {
            const response = await axios({
                method: "post",
                url: `http://localhost:4000/login`,
                data: {
                    username: values.username,
                    password: values.password,
                },
            });
            if (response) {
                return navigate("/profile");
            } else {
                throw Error("No response");
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div className="App">
            <h1> Login </h1>
            <form onSubmit={loginSubmit}>
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
                <button>Login</button>
            </form>
        </div>
    )
}
