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
 
  const [role,setRole]=useState(0)
 
  return (
    <>
    {/* <NavBar login={login} admin={admin}/> */}
   <Bar role={role}/>
    <Routes>
      <Route path='/login' element={<Start setRole={setRole}/>} />
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
