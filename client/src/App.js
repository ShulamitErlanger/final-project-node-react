import './App.css';
import Start from './components/Start'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Surveys from './components/features/surveys/Surveys';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import UserSurveys from './components/features/users/UserSurveys';
import SegmentSurveys from './components/features/surveys/SegmentSurveys';
import Segments from './components/features/users/Segments'
import UsersNavBar from './components/features/users/UsersNavBar';
import { useGetUserQuery } from './components/features/users/userApiSlice';
import About from './About';
import BaseNavBar from './components/features/users/BaseNavBar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useLoginMutation} from './components/features/auths/authApiSlice'
import "./index.css";
import Logout from './components/LogOut';
import RutBar from './components/RutBar'
import HomePageUser from './components/HomePageUser';
function App() {
// const [rol,setRol]=useState(0);
 const[loginSuccess,setLoginSuccess]=useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()  
  const [loginFunc, {isError, error, isSuccess,data}] = useLoginMutation();
    const{
        data:myUser,
        isLoading:userIsLoading,
        isError:userIsError,
        error:userError,
        isSuccess:userIsSuccess,
        refetch:userRefetch
        } = useGetUserQuery({id:''})
//     useEffect(()=>{
//     if(isSuccess){
//     dispatch(setToken(data))
//          if(userIsSuccess)
//          {
//           setRol(myUser.roles)
//          }
// // // // <NavBar role={myUser.roles}/>}
// //         myUser.roles=='admin'?navigate('/NavBar'):navigate('/UsersNavBar')}
    
// //         navigate('/UsersNavBar')
// //         {<UsersNavBar/>}
//         setLoginSuccess(true)

//  } },[isSuccess,userIsSuccess])

 

  return (
    <>
<div className='App' id="app">
      <div  style={{backgroundRepeat: 'no-repeat',backgroundSize: 'cover',
    
    backgroundPosition: "center",position:'sticky', top:'10'}}>
        {/* <Orders /> */} 
      {/* <BaseNavBar/> */}
      <RutBar/>
      {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}

 </div>
        {/* <AdminAppBar/> */}
  
 
    {/* <TemplateDemo>  */}
      {/* <BrowserRouter> */}
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<HomePageUser />} />

          <Route path="/bar" element={<RutBar />} />
          <Route path='/Surveys' element={<Surveys />} />
          <Route path='/login' element={<Start />} />
          <Route path='/logOut' element={<Logout/>} />

          <Route path='/NavBar' element={<NavBar/>} />
          <Route path='/BaseNavBar' element={<BaseNavBar/>} />
          <Route path='/UserSurveys' element={<UserSurveys myUser={myUser}/>} />
          <Route path='/surveySegmentation' element={<SegmentSurveys />} />
          <Route path='/segments' element={<Segments />} />
          <Route path='/UsersNavBar' element={<UsersNavBar myUser={myUser}/>} />
          <Route path='/we' element={<About myUser={myUser}/>} />
          </Routes>
          {/* </BrowserRouter> */}
        {/* </TemplateDemo> */}
        

</div>
          {/* <Route path='/view' element={<BasicDemo />} />
          <Route path='/PreviousOrders' element={<PreviousOrders />} />
          <Route path='/adminAppBar' element={<AdminAppBar/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/adminAppBar' element={<AdminAppBar/>} />
          <Route path='/viewAdmin' element={<ViewAdmin/>} /> */}
       

     
       
    </>
  );
}

export default App;