import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Login from '../components/Login'

export default function logout() {
    const router = useRouter()
    
    useEffect(()=>{
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("userInfo")
    },[])

    return(
        <>
            <Login />
        </>
    )
}
