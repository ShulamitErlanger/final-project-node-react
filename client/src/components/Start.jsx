import React, { useEffect, useRef, useState } from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Register from './features/auths/Register';
import {useLoginMutation} from './features/auths/authApiSlice'
import { setToken } from './features/auths/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useGetUserQuery } from './features/users/userApiSlice';
import DecodeToken from './DecodeToken';
const Start=()=>{
    const username=useRef()
    const password=useRef()
    const[register,setRegister]=useState(false)
    const [loginFunc, {isError, error, isSuccess:loginSuccess,data}] = useLoginMutation();
    

        const dispatch = useDispatch()
        const navigate = useNavigate()
        let decodeToken;
        let users;
        const{
            data:myUser,
            isLoading:userIsLoading,
            isError:userIsError,
            error:userError,
            isSuccess:userIsSuccess,
            refetch:userRefetch
            } = useGetUserQuery({id:''})
        useEffect(()=>{
        if(loginSuccess){    
        dispatch(setToken(data))
        dispatch(setToken(data))
        decodeToken =DecodeToken()
        users=decodeToken?.roles;
        users==='admin'?navigate('/'):navigate('/user')

    }
    else{

    }
        },[loginSuccess,userIsSuccess])
    
    const handleSubmit = async (e) => {
       await loginFunc({username:username.current.value,password:password.current.value})
        };
    
    return(
        <>
         <br/> <br/> <br/> <br/> <br/>
        <div className="card" >
            <div className="flex flex-column md:flex-row" style={{marginTop:'100px'}}>
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <InputText placeholder='שם משתמש' ref={username} id="username" type="text" className="w-12rem" />
                        <label className="w-6rem">שם משתמש</label>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                      
                        <InputText placeholder='סיסמה' ref={password} id="password" type="password" className="w-12rem" />
                        <label className="w-6rem">סיסמה</label>
                    </div>
                    <Button label="כניסה" icon="pi pi-user" className="w-10rem mx-auto" onClick={()=>{handleSubmit()}}></Button>
                   
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                  
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="הרשמה" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={()=>{setRegister(true)}}></Button>
                    
                    {register && <Register/>}
                    
                </div>
            </div>

        </div>
        </>
    )
}
export default Start






        
         