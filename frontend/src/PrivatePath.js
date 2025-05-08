import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import {toast} from 'react-toastify'

function PrivatePath() {
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token || token.trim()===""){
            // alert("No Valid token")
            toast.error("No Valid token",{position:'top-right', autoClose:2500})
            navigate('/')
        }
    },[navigate])

    return (
        <>
        {localStorage.getItem('token') ? <Outlet/> : null}
        </>
    )
}

export default PrivatePath