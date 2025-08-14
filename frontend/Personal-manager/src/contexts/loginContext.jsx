import { useContext,createContext,useState } from "react";


const LoginContext= createContext()

export const LoginProvider=({children})=> {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [currUser,setCurrUser]=useState(null)

    return(
        <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn,currUser,setCurrUser}}>
            {children}
        </LoginContext.Provider>
    )
}


export const useLogin = () => useContext(LoginContext)