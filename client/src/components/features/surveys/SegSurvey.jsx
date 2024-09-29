import { Button } from "primereact/button"
import { useState} from "react"
import SegQuestion from "./SegQuestion";
import { useChangeStatusMutation} from "./surveyApiSlice";
import { useChooseSegQuestionMutation } from "./questions/questionApiSlice";
const SegSurvey=(props)=>{
   
    const {survey,refetch}=props
    const [saveDisable,setSaveDisable]=useState(false)

    let [select, setSelect] = useState(survey.questions.map(q=>{return {_id:q._id,select:q.segmentation.kind}}));
    let [text, setText] = useState(survey.questions.map(q=>{return{_id:q._id,text:q.segmentation.note}}));
    let [wichDataSelect, setWichDataSelect]=useState(survey.questions.map(q=>{return{_id:q._id,choose:q.segmentation.choose}})||{_id:'',choose:''})   
    const [ChooseSegQuestionFunc, {isError, error, isSuccess,data}] =useChooseSegQuestionMutation()
    const [ChangeStatusFunc, {isError1, error1, isSuccess1,data1}] =useChangeStatusMutation()

    const chooseSegment = () => {
        if(select)
         select.map(q=>{ChooseSegQuestionFunc({_id:survey._id,questionId:q._id,kind:q.select.cname,note:text[text.indexOf(text.find(i=>i._id==q._id))].text})})
        if(wichDataSelect){
            wichDataSelect.map(q=>ChooseSegQuestionFunc({_id:survey._id,questionId:q._id,choose:q.choose.cname}).then(()=>refetch()))
          }
    };
    const changeStatus = (e) => {


        ChangeStatusFunc({_id:survey._id,status:'completed'}).then(()=>{refetch()}) 
       
   };
   
    return(
        <>
        {survey?.questions.map(q=><SegQuestion selectWich={wichDataSelect} setSelectWich={setWichDataSelect} select={select} setSelect={setSelect} text={text} setText={setText} question={q}/>)}
        <Button  onClick={chooseSegment} icon="pi pi-save" label="שמור" rounded style={{backgroundColor:"#e5e7eB", color:"#14B8A6"}}/> 
        <Button  disabled={saveDisable} style={{backgroundColor:"#e5e7eB", color:"#14B8A6"}} onClick={async()=>{await chooseSegment(); await setSaveDisable(true); changeStatus();}} icon="pi pi-send" label="שלח" rounded /> 
        </> 
    )
}
export default SegSurvey
