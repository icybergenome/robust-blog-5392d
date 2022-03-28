import React from 'react'

import Register from '../components/Register'
const MyRegister = () => {
  return (
    <Register />
  )
}

export async function getStaticProps({ params }) {
  const props = {
    slug : 'register',
    protected: true,
  };
  return { props };
}

export default MyRegister;
