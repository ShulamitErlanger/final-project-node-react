import { Button } from "primereact/button"
import { useRef, useState } from "react"
import {  useChangeCountMutation} from "../surveys/surveyApiSlice"
import {useChangeAnswerDataMutation} from '../surveys/answers/answerApiSlice'
import UserQuestion from "./UserQuestion"
import { useAddUserSurveyMutation } from "./userApiSlice"
const UserSurvey=(props)=>{
    const {setVisible,visible,refetch,survey,user}=props

 const [countFunc, {isError1, error1, isSuccess1,data1}] = useChangeCountMutation()
 const [addUserSurveyFunc, { isErrorSU, errorSU, isSuccessSU }] = useAddUserSurveyMutation()
 let [select,setSelect]=useState(survey.questions.map(q=>{return{_id:q._id,select:q.select}}))
 const count=()=>{
    countFunc({_id:survey._id}).then(()=>refetch())
 }
 const addSurveyForUser = () => {
        addUserSurveyFunc({_id: user._id, survey: survey })
        console.log("addSurveyForUser");

    }
 const [ChangeAnswerDataFunc, {isError, error, isSuccess,data}] =useChangeAnswerDataMutation()
const answer = (e) => {
    if(select){
     select.map(q=>ChangeAnswerDataFunc({_id:survey._id,questionId:q._id,answerId:select[select.indexOf(select.find(i=>i._id==q._id))].select}).then(()=>refetch()))}
};
    return(
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>
                <div dir='rtl' style={{ position: 'sticky', top: 200, fontSize: '20px', fontFamily: 'Yehuda CLM', top: '10px' }}>
                <div style={{fontWeight:'bold',fontSize: '30px', fontFamily: 'Yehuda CLM', backgroundColor: "white", textAlign: 'center', top: '0px', position: 'sticky' }}>{survey.title}</div><br /><br />
                    {survey?.questions.map((q,i) => <UserQuestion select={select} setSelect={setSelect} refetch={refetch} question={q} survey={survey}index={i} />)}

                </div> <div style={{ flex: 1 }}> 
                </div>
            </div>  <footer style={{ textAlign: 'center', padding: '10px' }}>
                <p> <Button onClick={async () => {console.log('click');
                    await addSurveyForUser(); await count(); await answer(); window.location.reload(true); setVisible(false)
                }} label='&nbsp;שמור' icon="pi pi-save" /> </p>
            </footer>
        </>
    )
}
export default UserSurvey

