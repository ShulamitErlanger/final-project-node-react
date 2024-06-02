import logo from './logo.svg';
import './App.css';
import './index.css';
import Start from './components/Start'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
//import SurveyList from './componnents/surveys/Surveys';
import Surveys from './components/features/surveys/Surveys';
//import SurveyDialog from './componnents/surveys/SurveyDialog';
//import Quest from './componnents/questions/Question';
//import Survey from './componnents/surveys/Survey'
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import UserSurveys from './components/features/users/UserSurveys'
import SegmentSurveys from './components/features/surveys/SegmentSurveys';
import Segments from './components/features/users/Segments';
 import Diagram from './components/features/surveys/Diagram';
// import Try from './components/features/surveys/Try';
import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import BaseNavBar from './components/BaseNavBar';
import UsersNavBar from './components/UsersNavBar';
import About from './About';
import Bar from './components/Bar';
import Menu from './components/features/surveys/Nav';
import RutBar from './components/RutBar'
import Logout from './components/LogOut';
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
          <Route path='/NavBar' element={<NavBar/>} />
          <Route path='/BaseNavBar' element={<BaseNavBar/>} />
          <Route path='/UserSurveys' element={<UserSurveys myUser={myUser}/>} />
          <Route path='/surveySegmentation' element={<SegmentSurveys />} />
          <Route path='/segments' element={<Segments />} />
          <Route path='/UsersNavBar' element={<UsersNavBar myUser={myUser}/>} />
          <Route path='/we' element={<About myUser={myUser}/>} />
          </Routes>
   
    </div>
    </>
  );
}

export default App;
