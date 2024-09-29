import React, { useEffect } from 'react';
import { useLoginMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
const Login = (props) => {
const dispatch = useDispatch()
const {formData}=props
const [loginFunc, {isError, error, isSuccess,data}] =
useLoginMutation()
useEffect(()=>{
if(isSuccess){
dispatch(setToken(data))
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