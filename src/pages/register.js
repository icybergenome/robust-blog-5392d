import React from 'react'

import Register from '../components/Register'
const MyRegister = () => {
  return (
    <Register />
  )
}

export async function getStaticProps({ params }) {
  const props = {
    slug : 'register'
  };
  return { props };
}

export default MyRegister;
