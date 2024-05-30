import { Button } from "primereact/button"
import { useRef, useState } from "react"
import {  useChangeCountMutation} from "../surveys/surveyApiSlice"
import {useChangeAnswerDataMutation} from '../surveys/answers/answerApiSlice'
import UserQuestion from "./UserQuestion"
const UserSurvey=(props)=>{
    const {setVisible,visible,refetch,survey}=props

 const [countFunc, {isError1, error1, isSuccess1,data1}] = useChangeCountMutation()
 let [select,setSelect]=useState(survey.questions.map(q=>{return{_id:q._id,select:q.select}}))
 const count=()=>{
    countFunc({_id:survey._id}).then(()=>refetch())
 }
 const [ChangeAnswerDataFunc, {isError, error, isSuccess,data}] =useChangeAnswerDataMutation()
const answer = (e) => {
    if(select){
     select.map(q=>ChangeAnswerDataFunc({_id:survey._id,questionId:q._id,answerId:select[select.indexOf(select.find(i=>i._id==q._id))].select}).then(()=>refetch()))}
     else{
        console.log('no select');
     }
};
    return(
        <>
       {survey?.questions.map((q,i)=><UserQuestion select={select} setSelect={setSelect} refetch={refetch} question={q} survey={survey}index={i}/>)}
        <Button onClick={()=>{count(); answer();setVisible(false)}} icon="pi pi-save" rounded /> 
        </>
    )
}
export default UserSurvey

