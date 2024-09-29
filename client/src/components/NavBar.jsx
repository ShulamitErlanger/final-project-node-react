import { Menubar } from 'primereact/menubar';
import React from 'react'; 
import { useNavigate} from 'react-router-dom';

export default function NavBar(props){

    const {role}=props
        const navigate = useNavigate()

     let items=[];
     if(role==='admin'){
    items = [
        { label: 'דף הבית', icon: 'pi pi-home',command:()=>{navigate('/')} },
        { label: 'התנתק', icon: 'pi pi-check-circle',command:()=>{navigate('/login')}},
        { label: 'סקרים למשתמשים', icon: 'pi pi-list',command:()=>{navigate('UserSurveys')} },
        { label: 'כל סקרים', icon: 'pi pi-inbox',command:()=>{navigate('/Surveys')} },
        { label: 'סקרים לפילוח', icon: 'pi pi-inbox',command:()=>{navigate('/surveySegmentation')} },
        { label: 'סקרים מפולחים', icon: 'pi pi-inbox',command:()=>{navigate('/segments')} }
    ]}
    else{
        if(role==='user'){
       items = [
            { label: 'home', icon: 'pi pi-home',command:()=>{navigate('/user')} },
            { label: 'userSurveys', icon: 'pi pi-list',command:()=>{navigate('/UserSurveys')} },
            { label: 'segmented', icon: 'pi pi-inbox',command:()=>{navigate('/segments')} }

    ]} else{
        items = [
            { label: 'כניסה', icon: 'pi pi-check-circle',command:()=>{navigate('/login')} },
            { label: 'דף הבית', icon: 'pi pi-home',command:()=>{navigate('/user')} },
            { label: '?מי אנחנו', icon: 'pi pi-inbox',command:()=>{navigate('/we')} }

    ]
    }
    }
   
 

    return (
        <div className="card" style={{position:"fixed"}}>
            <Menubar model={items} />
        </div>
    )
}
         


