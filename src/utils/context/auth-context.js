import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { isValid } from "../helpers/isValid";

const AuthContext = createContext();
const { Provider } = AuthContext;


const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState("");
    const [userInfo, setUserInfo] = useState({})


    const getUser = () => {
        const jwtToken = localStorage.getItem("jwtToken")
        const userInfo = localStorage.getItem("userInfo")
        setAuthState(jwtToken);
        setUserInfo(JSON.parse(userInfo));
    }

    useEffect(() => {
        getUser()
    }, [authState])

    const setUserAuthInfo = (token) => {
     const jwtToken = localStorage.setItem("jwtToken", token);
     setAuthState(jwtToken);
    };

    

    const setUserDetails = (userInfo) => {
        const userDetails = localStorage.setItem("userInfo", JSON.stringify(userInfo))
        setUserInfo(userDetails)
    }


  
   const isUserAuthenticated = () => {
     
    
    if (!authState) {
        // setAuthError([{title: "Unauthorized", message: "You are unathorized please login"}])
        // console.log("Authhh error",authError)
        return false;
    }else{
        const authToken  = localStorage.getItem("jwtToken")
        const valid = isValid(authToken)
        if(valid.valid && valid.user_id == userInfo.id){
          return true
        }else{
          // setAuthError([{title: "Forbidden", message: "You cannot access or make request"}])
          console.log("Invalid user token")
          return false
        }
        
    }
   };

   const isUser = (user_id) => {
     
    
    if (!authState) {
        return false;
    }else{
        const authToken  = localStorage.getItem("jwtToken")
        const valid = isValid(authToken)
        if(valid.valid && valid.user_id == userInfo.user_id){
          return {message: "User Verified", status: 1}
        }else{
          // setAuthError([{title: "Forbidden", message: "You cannot access or make request"}])
          return {message: "User Unverified", status: 0}
        }
        
    }
   };
  
   return (
     <Provider
       value={{
        authState,
        // authError,
        userInfo,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        setUserDetails: (userDetails) => setUserDetails(userDetails),
        isUserAuthenticated,
        isUser
      }}
     >
      {children}
     </Provider>
   );
  };

  // export const ProtectRoute = ({ children }) => {
  //   const { isUserAuthenticated, isLoading } = useAuth();
  //   if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')){
  //     return <LoadingScreen />; 
  //   }
  //   return children;
  // };
  
  export { AuthContext, AuthProvider };