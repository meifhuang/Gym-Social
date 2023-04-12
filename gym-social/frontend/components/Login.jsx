import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from '../src/UserContext'


export default function Login(props) {
    const { message } = props
    const { username, setUsername } = useContext(UserContext);
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

    const loginSubmit = async (e) => {
        // alert("asdasd");
        // console.log("registered");
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                username: values.username,
                password: values.password,
            });
            if (response.status === 201) {
                setUsername(response.data.username)
                navigate("/profile")
            }
            else {
                console.log('Login failed');
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    // }
    //     if (response) {
    //         console.log(response.data)
    //         setUsername(response.data.username)
    //         return navigate("/profile");
    //     } else {
    //         throw Error("No response");
    //     }
    // };


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
