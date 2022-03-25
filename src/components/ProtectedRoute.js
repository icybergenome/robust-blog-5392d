import React, { useEffect } from 'react'
import Login from './Login'

import { useContext } from 'react';
import { AuthContext } from '../utils/context/auth-context';
import { useRouter } from 'next/router';
import pageLayouts from '../layouts';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../utils/graphql/queries/get';
import { GET_CATEGORIES } from '../utils/graphql/queries/get';
import { GET_HEADER } from '../utils/graphql/queries/get';
import { GET_PAGE } from '../utils/graphql/queries/get';

import { data } from '../../content/idMaping/types';

import _ from 'lodash';

export default function ProtectedRoute(props) {
    
    const router = useRouter()
    const authContext = useContext(AuthContext);
    
    const Component = props.element
    

    const auth = authContext.isUserAuthenticated();

    console.log("My Protected AUTH",auth)

    const queryMultiple = () => {
      const slug = data.find((d) => d.name === '/');

      const res1 = useQuery(GET_CATEGORIES)
      const res2 = useQuery(GET_HEADER)
      const res3 = useQuery(GET_POSTS)
      const res4 = useQuery(GET_PAGE,{variables: {id:slug.id}})
      return [res1,res2,res3,res4];
    }
    const resultQuery = queryMultiple()
    


    if(!auth && props.componentProps.slug !== 'login'){
        // router.replace("/login")
        return <Login />
    }

    if(auth && (props.componentProps.slug === 'login' || props.componentProps.slug == 'register')){
      const categories = resultQuery[0].data;
      const header = resultQuery[1].data;
      const post = resultQuery[2].data;
      const page = resultQuery[3].data;

      const page_pros = {
        categories: categories,
        header: header,
        page: page,
      }

      const Home = pageLayouts['home']
        
        // router.push('/login', '/', { shallow: true })
        return <Home {...page_pros} posts={post}/>;
    }

   return (
    <Component {...props.componentProps}/>
  )
}
