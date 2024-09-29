import './App.css';
import Start from './components/Start'
import { Route, Routes } from 'react-router-dom';
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
import "./index.css";
import Logout from './components/LogOut';
import RutBar from './components/RutBar'
import HomePageUser from './components/HomePageUser';
function App() {

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
<div className='App' id="app">
      <div  style={{backgroundRepeat: 'no-repeat',backgroundSize: 'cover',
    
    backgroundPosition: "center",position:'sticky', top:'10'}}>

      <RutBar/>


 </div>

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
</div>

    </>
  );
}

export default App;