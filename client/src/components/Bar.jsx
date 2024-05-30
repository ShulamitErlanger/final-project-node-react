import React from "react";
import { Menubar } from 'primereact/menubar';
import {useNavigate} from "react-router-dom"
import { TabPanel, TabView } from "primereact/tabview";
import Surveys from "./features/surveys/Surveys";
import UserSurveys from "./features/users/UserSurveys";
import SegmentSurveys from './features/surveys/SegmentSurveys'
const Bar = (props) => {

    const navigate=useNavigate()
    const {role}=props
    const myAccount = () => {
        if(localStorage.getItem("token")) {
            navigate(`/Surveys`)
        }
        else{
            navigate(`/login`)
        }
    }

    const barArr =role==2? [
        {
            label:"כל הסקרים", 
            command: myAccount
        },
        {
            label:"סקרי משתמש", 
            command: ()=>{navigate(`/UserSurveys`)}
        },
        {
            label:"פילוח", 
            command: ()=>{navigate(`/surveySegmentation`)}
        },
        {
            label:"סקרים מפולחים", 
            command: ()=>{navigate(`/segments`)}
        }
    ]:role==1?
    [ {
        label:"my surveys", 
        command: myAccount
    },
    {
        label:"user surveys", 
        command: ()=>{navigate(`/UserSurveys`)}
    },]:
    [ {
        label:"login", 
        command: ()=>{navigate(`/login`)}
    },
    {
        label:"user surveys", 
        command: ()=>{navigate(`/UserSurveys`)}
    },]


    return (
        <div >
            <Menubar model={barArr} style={{backgroundColor:'#00bbbb',position:'fixed',width:'100%',zIndex:100,top:0,left:0,borderRadius:'0px',height:'130px',fontSize:'25px',fontFamily:'Yehuda CLM',justifyContent:'center',opacity:0.95,}}/>
        </div>
    )
}
export default Bar


