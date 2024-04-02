import React, { useEffect, useRef, useState } from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css'
import '../index.css'
import Register from '../components/features/auths/Register';
import { useLoginMutation } from '../components/features/auths/authApiSlice';
import { setToken } from '../components/features/auths/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Start=()=> {
    var username=useRef()
    var password=useRef()
    var [register,setRegister]=useState(false)
    const [loginFunc, {isError, error, isSuccess,data}] =useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    useEffect(()=>{
        if(isSuccess){
            dispatch(setToken(data))
        navigate("/UsersNavBar")
        }
        },[isSuccess])
    
        const login = (e) => {
            e.preventDefault();
            loginFunc({username:username.current.value,password:password.current.value})
            };
    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText ref={username} id="username" type="text" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText ref={password} id="password" type="password" className="w-12rem" />
                    </div>
                    <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto"
                    onClick={login}
                    >
                    </Button>
                     
                </div>
                <div className="w-full md:w-2">
                     <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider> 
                  
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"
                    onClick={()=>{setRegister(true)}}>
                    </Button>
                    {register && <Register/>} 
                </div>
            </div>
        </div>
    )
}
export default Start
         