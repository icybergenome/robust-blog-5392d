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
import { Userdetails, userAuth } from '../utils/getUser';

export default function ProtectedRoute(props) {


  
    const [isLoading, setIsLoading] = useState(false) 
  
    const router = useRouter()
    const Component = props.element
    
    useEffect(() => {
      setIsLoading(true)
      router.events.on('routeChangeStart', () => setIsLoading(true));
      router.events.on('routeChangeComplete', () => setIsLoading(false));
      const user = userAuth()
      
      if(user){
        setIsLoading(false)
        console.log(user)
        if(user.valid && (props.componentProps.slug === 'login' || props.componentProps.slug === 'register')){
          console.log("In Home")
          router.push('/')
          return null
        } 
  
        if(!user.valid && (props.componentProps.slug !== 'login' && props.componentProps.slug !== 'register')){
          console.log("In login")
          router.push('/login')
          return null
        }
      }
      
      

    }, [Userdetails,router])
    

   return (
     
    <>
      {isLoading ? <LoadingSpinner /> : <Component {...props.componentProps}/>} 
      
    </>
  )
}
