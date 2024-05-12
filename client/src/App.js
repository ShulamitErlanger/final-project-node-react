import logo from './logo.svg';
import './App.css';
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

function App() {
  const [loginSuccess,setLoginSuccess]=useState(false)
  const [admin,setAdmin]=useState(0)
  const [login,setLogin]=useState(false)
  return (
    <>
{    console.log(admin, "app")
}    {/* <NavBar login={login} admin={admin}/> */}
   <Bar admin={admin}/>
    <Routes>
      <Route path='/login' element={<Start setAdmin={setAdmin} setLogin={setLogin}/>} />
      <Route path='/Surveys' element={<Surveys/>} />
      <Route path='/UserSurveys' element={<UserSurveys/>} />
      <Route path='/surveySegmentation' element={<SegmentSurveys />} />
      <Route path='/segments' element={<Segments/>} />
      <Route path='/NavBar' element={<NavBar/>} />
      <Route path='/UsersNavBar' element={<UsersNavBar/>} />
      <Route path='/we' element={<About/>} />
    </Routes>
    
    </>
  );
}

export default App;
