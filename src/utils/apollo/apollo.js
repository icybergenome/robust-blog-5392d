import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';
import { isValid } from "../helpers/isValid";
import { useContext } from "react";

import { AuthContext } from "../context/auth-context";


// let token;

// custom module setter:
// export const setToken = (newToken) => token = newToken;



const httpLink = createHttpLink({
  uri: `http://localhost:1337/graphql`,
});

 

const authLink = setContext((_, { headers }) => {
  
  let token = ''
  try{
    token = localStorage.getItem('jwtToken');

    // const userInfo = localStorage.getItem("userInfo")
    // const valid = isValid(token)
  }catch(e){
    console.log(e.message)
  }
  // token = valid.valid && valid.user_id == userInfo.id ? token : ''
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});



export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});