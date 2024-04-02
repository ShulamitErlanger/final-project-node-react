import React, { useEffect, useState } from 'react';
import { useLoginMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
const Login = (props) => {
const dispatch = useDispatch()
//const navigate = useNavigate()
const {formData}=props
const [loginFunc, {isError, error, isSuccess,data}] =
useLoginMutation()
useEffect(()=>{
if(isSuccess){
dispatch(setToken(data))
//navigate("/blogs")
}
},[isSuccess])
 //Function to handle form submission
const handleSubmit = (e) => {
e.preventDefault();
loginFunc(formData)
};
return (
<div>
……
</div>
);
};
export default Login;