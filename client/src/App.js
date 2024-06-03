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
function App() {
  return (
    <>
    <div className='App'>
      <RutBar/>
        <Routes>
          <Route path='/login' element={<Start/>} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/Surveys' element={<Surveys/>} />
          <Route path='/UserSurveys' element={<UserSurveys />} />
          <Route path='/surveySegmentation' element={<SegmentSurveys/>} />
          <Route path='/segments' element={<Segments/>} />
          <Route path='/we' element={<About/>} />
          <Route path='/' element={<HomePage/>} />
        </Routes>
    </div>
  </>
  );
}

export default App;
