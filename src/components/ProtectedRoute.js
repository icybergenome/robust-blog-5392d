import React, { useState, useEffect } from 'react'
import Login from './Login'

import { useContext } from 'react';
import { AuthContext } from '../utils/context/auth-context';
import { useRouter } from 'next/router';
import pageLayouts from '../layouts';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../utils/graphql/queries/getPosts';
import { GET_CATEGORIES } from '../utils/graphql/queries/getCategories';
import { GET_HEADER } from '../utils/graphql/queries/getHeader';
import { GET_PAGE } from '../utils/graphql/queries/getPage';

import { data } from '../../content/idMaping/types';
import _ from 'lodash';
import { css } from "@emotion/react";

import LoadingSpinner from './LoadingSpinner';


export default function ProtectedRoute(props) {
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setIsError] = useState(false) 

    const router = useRouter()
    const authContext = useContext(AuthContext);
    const auth = authContext.isUserAuthenticated();

    const Component = props.element

    useEffect(() => {
      router.events.on('routeChangeStart', () => setIsLoading(true));
      router.events.on('routeChangeComplete', () => setIsLoading(false));

      console.log("authhhhhh",auth)
      console.log("SLUGG",props.componentProps.slug)
      // const token = localStorage.getItem("jwtToken")
    
      
      if(auth && (props.componentProps.slug === 'login' || props.componentProps.slug === 'register')){
        console.log("In Home")
        // setIsLoading(true)
        router.push('/')
        return
      } 

      if(!auth && (props.componentProps.slug !== 'login' && props.componentProps.slug !== 'register')){
        console.log("In login")
        // setIsLoading(true)
        router.push('/login')
        return
    }

    }, [auth,router])
    

   return (
     
    <>
      {isLoading ? <LoadingSpinner /> : <Component {...props.componentProps}/>} 
      
    </>
  )
}
