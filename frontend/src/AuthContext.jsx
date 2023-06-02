import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {

    useEffect(() => {
        setHasToken(localStorage.getItem("token"));
        setToken(localStorage.getItem("token"));
        setUsername(localStorage.getItem("id"));
        setUserId(localStorage.getItem("id"));
    }, [])

    const [username, setUsername] = useState();
    const [userId, setUserId] = useState(""); 
    const [hasToken, setHasToken] = useState("");
    const [token, setToken] = useState("");
    const [userPicUrl, setUserPicUrl] = useState("");

    return (
        <AuthContext.Provider value={{ username, setUsername, userId, setUserId, hasToken, setHasToken, token, setToken, userPicUrl, setUserPicUrl}}>
            {props.children}
        </AuthContext.Provider>
    )
}
