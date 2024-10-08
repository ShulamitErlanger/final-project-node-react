import { useEffect } from 'react';
import { useLoginMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const login = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const [loginFunc, {isError, error, isSuccess,data}] =
useLoginMutation()
useEffect(()=>{
if(isSuccess){
dispatch(setToken(data))
}
},[isSuccess])
const handleSubmit = (e) => {
e.preventDefault();
loginFunc(formData)
};
};
export default login;