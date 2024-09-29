import { Button } from "primereact/button"
import {useState} from "react"
import {  useChangeCountMutation} from "../surveys/surveyApiSlice"
import { useAddUserSurveyMutation } from "./userApiSlice"
import UserQuestion from "./UserQuestion"
import { useChangeAnswerDataMutation } from "../surveys/answers/answerApiSlice"

const UserSurvey=(props)=>{
    const {setVisible,refetch,survey,user}=props
    const [loading, setLoading] = useState(false);
    const countFunc = useChangeCountMutation()[0]
    const addUserSurveyFunc = useAddUserSurveyMutation()[0];
    const changeAnswerDataFunc = useChangeAnswerDataMutation()[0];
 
 let [select,setSelect]=useState(survey.questions.map(q=>({_id:q._id,select:q.select})))
 const count=async()=>{
    await countFunc({_id:survey._id})
 }
 const addSurveyForUser =async() => {
       await addUserSurveyFunc({_id: user._id, survey: survey })

    }
    const chooseSegment = async () => {
        if (select) {
            await Promise.all(select.map(q => changeAnswerDataFunc({ _id: survey._id, questionId: q._id, answerId: select[select.indexOf(select.find(i => i._id === q._id))].select })));
            refetch();
        } else {
            console.log('no select');
        }
    };

    const handleButtonClick = async () => {
        setLoading(true);

        try {
            await addSurveyForUser();
            await count();
            await chooseSegment();
            setVisible(false);
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
            window.location.reload(true); // Reload window after segmentation change
        }
    };

    return(
        <>
             <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh' }}>


<div dir='rtl' style={{ position: 'sticky', top: 200, fontSize: '20px', fontFamily: 'Yehuda CLM', top: '10px' }}>

    <div dir='rtl' style={{fontWeight:'bold',fontSize: '30px', fontFamily: 'Yehuda CLM', backgroundColor: "white", textAlign: 'center', top: '0px', position: 'sticky' }}>{survey.title}</div><br /><br />
    {survey?.questions.map(q => <UserQuestion select={select} setSelect={setSelect} refetch={refetch} question={q} survey={survey} />)}

</div>
{/*            <div style={{ flex: 1 }}> 


</div> */}

</div>  <footer style={{ textAlign: 'center', padding: '10px' }}>
<p>
<Button
       id="butUserSurvey"
       onClick={handleButtonClick}
       label='&nbsp;שמור'
       icon="pi pi-save"
       disabled={loading} // Disable button while loading
   />
   {loading && <span>Loading...</span>} {/* Show loading message or spinner */}

</p>
</footer>


        </>
    )
}
export default UserSurvey

