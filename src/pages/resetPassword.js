import React from 'react'
import ResetPassword from '../components/ResetPassword'

const MyResetPassword = () => {
  return (
    <ResetPassword />
  )
}

export async function getStaticProps({ params }) {
  const props = {
    slug : 'login',
    protected: true,
  };
  return { props };
}

export default MyResetPassword;
