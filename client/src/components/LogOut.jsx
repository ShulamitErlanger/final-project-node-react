import React, {useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiSlice from "../app/apiSlice";
import { removeToken } from "./features/auths/authSlice";

export default function Logout() {
    const dispatch = useDispatch()
    const navigate=useNavigate();
    
    useEffect(()=>{
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    })

    return(
        <>
        </>
    )
}