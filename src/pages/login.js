import React from 'react'



import Login from '../components/Login'
const MyLogin = () => {
  return (
    <Login />
  )
}

export async function getStaticProps({ params }) {


    const props = {
      slug : 'login',
      protected: true,
    };
    
    return { props };
}
export default MyLogin;
