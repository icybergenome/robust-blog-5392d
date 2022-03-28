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
    const { pathname } = router;
  
    const authContext = useContext(AuthContext);
    const auth = authContext.isUserAuthenticated();

    const Component = props.element

    useEffect(() => {

      console.log("authhhhhh",auth)
      console.log("slug",props.componentProps.slug)
      const token = localStorage.getItem("jwtToken")
      if(!token && (props.componentProps.slug !== 'login' && props.componentProps.slug !== 'register') ){
        console.log("In login")
        setIsLoading(false)
        router.push('/login')
        return
      }

      if(token && (props.componentProps.slug === 'login' && props.componentProps.slug === 'register')){
        console.log("In Home")
        setIsLoading(false)
        router.push('/')
        return
      }

    }, [auth])
    

   return (
     
    <>
      {isLoading ? <LoadingSpinner isLoading={isLoading}/> : <Component {...props.componentProps}/>} 
      
    </>
  )
}
