import React, { useState } from "react"
const userContext = React.createContext({})

export function UserContextProvider ({children}){
    const [user, setuser] = useState({})


    return ( <userContext.Provider value={{user,setuser}}>
        {children}
    </userContext.Provider>)
}

export default userContext