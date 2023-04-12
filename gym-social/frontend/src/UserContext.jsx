import { createContext, useContext, useState } from 'react'

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null)
    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    )
}
