import { Button } from "primereact/button"

import { useState } from "react"
import SegQuestion from "./SegQuestion";
import { useChangeStatusMutation } from "./surveyApiSlice";
import { useChooseSegQuestionMutation } from "./questions/questionApiSlice";
import SendSurvey from "./SendSurvey";
const SegSurvey=(props)=>{
   
    const {survey,refetch,setVisible}=props
    let [select, setSelect] = useState(survey.questions.map(q=>{return {_id:q._id,select:q.segmentation.kind}}));
    let [text, setText] = useState(survey.questions.map(q=>{return{_id:q._id,text:q.segmentation.note}}));
    const [send,setSend]=useState(false)
    const [ChooseSegQuestionFunc, {isError, error, isSuccess,data}] =useChooseSegQuestionMutation()
    const chooseSegment = () => {
         select.map(q=>{ChooseSegQuestionFunc({_id:survey._id,questionId:q._id,kind:q.select,note:text[text.indexOf(text.find(i=>i._id==q._id))].text||' '})})
    };
    return(
        <>
        <div style={{textAlign:'center',fontFamily:'Yehuda CLM'}}>
        <h1>{survey.title}</h1></div>
        {console.log("seg s")}
        {survey?.questions.map(q=> <SegQuestion select={select}setSelect={setSelect} text={text} setText={setText} question={q}/>)}
        <br/><br/>
        <Button onClick={()=>{chooseSegment();setSend(true);}} icon="pi pi-save" label="שמור" rounded /> 
        {send && <SendSurvey visible={send} setVisible={setSend} setVisibleS={setVisible} refetch={refetch} survey={survey}status={"completed"}/>}
        </> 
    )
}
export default SegSurvey
