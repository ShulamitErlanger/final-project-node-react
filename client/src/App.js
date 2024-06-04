import './App.css';
import './index.css';
import Start from './components/Start'
import {Route,Routes } from 'react-router-dom';
import Surveys from './components/features/surveys/Surveys';
import UserSurveys from './components/features/users/UserSurveys'
import SegmentSurveys from './components/features/surveys/SegmentSurveys';
import Segments from './components/features/users/Segments';
import React from 'react';
import About from './About';
import RutBar from './components/RutBar'
import Logout from './components/LogOut';
import HomePage from './components/HomePage'
import { useLoginMutation } from './components/features/auths/authApiSlice';
import { useGetUserQuery } from './components/features/users/userApiSlice';
function App() {
  const [loginFunc, {isError, error, isSuccess,data}] = useLoginMutation();
  const{
      data:myUser,
      isLoading:userIsLoading,
      isError:userIsError,
      error:userError,
      isSuccess:userIsSuccess,
      refetch:userRefetch
      } = useGetUserQuery({id:''})
  
 
  return (
    <>
    <div id='App'>
      <div style={{position:'sticky',top:'10'}}>
    {/* <NavBar login={login} admin={admin}/> */}
   {/* <Bar role={role}/> */}
   {/* <Menu currentPage={currentPage}/> */}
   <RutBar/> 
   </div>
   <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bar" element={<RutBar />} />
          <Route path='/Surveys' element={<Surveys />} />
          <Route path='/login' element={<Start />} />
          <Route path='/logOut' element={<Logout/>} />
          {/* <Route path='/NavBar' element={<NavBar/>} />
          <Route path='/BaseNavBar' element={<BaseNavBar/>} /> */}
          <Route path='/UserSurveys' element={<UserSurveys myUser={myUser}/>} />
          <Route path='/surveySegmentation' element={<SegmentSurveys />} />
          <Route path='/segments' element={<Segments />} />
          {/* <Route path='/UsersNavBar' element={<UsersNavBar myUser={myUser}/>} /> */}
          <Route path='/we' element={<About myUser={myUser}/>} />
          </Routes>
   
    </div>
  </>
  );
}

export default App;
