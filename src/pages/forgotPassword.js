import React from 'react'



import MyForgotPassord from '../components/ForgotPassord'
const ForgotPassord = () => {
  return (
    <ForgotPassord />
  )
}

export async function getStaticProps({ params }) {


    const props = {
      slug : 'login',
      protected: true,
    };
    
    return { props };
}
export default MyForgotPassord;
