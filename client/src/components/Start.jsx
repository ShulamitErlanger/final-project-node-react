import React, { useEffect, useRef, useState } from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Register from './features/auths/Register';
import {useLoginMutation} from './features/auths/authApiSlice'
import { setToken } from './features/auths/authSlice';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate,NavLink } from 'react-router-dom';
import { useGetUserQuery } from './features/users/userApiSlice';
import { useSendMailMutation } from './features/surveys/mailApiSlice';

//import { useNavigate } from 'react-router-dom';
//z6o1f2n5a8t8p2a5a5n3e1a7h
const Start=(props)=>{
    const username=useRef()
    const password=useRef()
    const[register,setRegister]=useState(false)
    const [loginFunc, {isError, error, isSuccess:loginSuccess,data}] = useLoginMutation();
    const [sendMailFunc, {isError:sendIsError, error:sendError, isSuccess:sendIsSuccess,data:send}] = useSendMailMutation()
    const sendeE=async()=>{
    await sendMailFunc({ to: ["rivkam1212@gmail.com","rivkanan1212@gmail.com","37325533305@mby.co.il",'shulamit9018@gmail.com'], title: `מערכת הסקרים שלנו🖐 `, html:"hello, you welcome" })
    }

        const dispatch = useDispatch()
        const navigate = useNavigate()

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
        navigate('/Surveys')
           
            //navigate('/UsersNavBar')
        // {<UsersNavBar/>}
        // setLoginSuccess(true)
      //navigate(data.roles==='admin'?'/Surveys':'UsersNavBar')
    }
    else{

    }
        },[loginSuccess,userIsSuccess])
    
    const handleSubmit = async (e) => {
        console.log(username.current.value);
       // e.preventDefault();
       await loginFunc({username:username.current.value,password:password.current.value})
       
        console.log(data);
        };
    
    return(
        <>
        
        <div className="card" >
            <div className="flex flex-column md:flex-row" style={{marginTop:'100px'}}>
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText ref={username} id="username" type="text" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText ref={password} id="password" type="password" className="w-12rem" />
                    </div>
                    <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" onClick={()=>{/*sendeE();*/handleSubmit()}}></Button>
                   
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    {/* <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider> */}
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={()=>{setRegister(true)}}></Button>
                    
                    {register && <Register/>}
                    
                </div>
            </div>
            {/* {loginSuccess && <UsersNavBar/>} */}
        </div>
        </>
    )
}
export default Start



/**/


        
         