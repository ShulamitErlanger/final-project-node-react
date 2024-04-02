import { Button } from "primereact/button"
// import {useAddQuestionMutation}from './questions/questionApiSlice'
// import Question from "./questions/Question"
import { useRef, useState } from "react"
// import QuestionDialog from "../surveys/questions/QuestionDialog"
// import { useParams } from "react-router-dom"
// import { useAddSurveyMutation, useChangeStatusMutation, useUpdateSurveyMutation } from "./surveyApiSlice"
// import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace"
// import { InputText } from "primereact/inputtext"
import { CascadeSelect } from 'primereact/cascadeselect';
import SegQuestion from "./SegQuestion";
import { useChangeStatusMutation } from "./surveyApiSlice";
import { useChooseSegQuestionMutation } from "./questions/questionApiSlice";
const SegSurvey=(props)=>{
    const {survey,refetch,setVisible}=props
    const [saveDisable,setSaveDisable]=useState(false)
    let [select, setSelect] = useState(survey.questions.map(q=>{return {_id:q._id,select:q.segmentation.kind}}));
    let [text, setText] = useState(survey.questions.map(q=>{return{_id:q._id,text:q.segmentation.note}}));
    const [ChooseSegQuestionFunc, {isError, error, isSuccess,data}] =useChooseSegQuestionMutation()
    const chooseSegment = () => {
         select.map(q=>{ChooseSegQuestionFunc({_id:survey._id,questionId:q._id,kind:q.select,note:text[text.indexOf(text.find(i=>i._id==q._id))].text||'hhgghghghghhg'})})
      // e.preventDefault();
    };

    const [changeStatusFunc, {isError1, error1, isSuccess1,data1}] =useChangeStatusMutation()
    const changeStatus = () => {
        changeStatusFunc({_id:survey._id,status:"completed"}).then(()=>refetch())   
    };

   
    return(
        <>
        <h1>{survey.title}</h1>
        {survey?.questions.map(q=> <SegQuestion select={select}setSelect={setSelect} text={text} setText={setText} question={q}/>)}
        <Button onClick={chooseSegment} icon="pi pi-save" rounded /> 
        <Button onClick={async()=>{await chooseSegment(); await changeStatus();setVisible(false)}} icon="pi pi-send" rounded /> 
        </> 
    )
}
export default SegSurvey
