import { Button } from "primereact/button"
import { useRef, useState } from "react"
import Question from "./questions/Question"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { StyleClass } from "primereact/styleclass"
import { useAddSurveyMutation, useChangeStatusMutation, useUpdateSurveyMutation } from "./surveyApiSlice"
import { useAddQuestionMutation } from "./questions/questionApiSlice"
import { Slider } from "primereact/slider"


const AddSurvey=(props)=>{
    const {refetch,setVisibleNew}=props
    const [ed,setEd]=useState(false)
    const [quest,setQuest]=useState(false) 
    const [selectedSex, setSelectedSex] = useState({name:null,code:''})
    const [selectedSector, setSelectedSector] = useState({name:null,code:''})
  //const [selectedAge, setSelectedAge] = useState({name:null,code:''});
  //const [selectedBirthDate, setSelectedBirthDate] = useState(Date)
    const title=useRef('')
    const [text,setText]=useState('')
    let [questions,setQuestions]=useState([])
    const [addSurveyFunc,{data:survey={},isError:addSurveyIsError,error:addSurveyError,isSuccess:addSurveyIsSuccess}]=useAddSurveyMutation()
    const [addQuestionFunc,{isError:addQuestionIsError,error:addQuestionError,isSuccess:addQuestionIsSuccess,data:surveyQuestion}]=useAddQuestionMutation()
    const [changeStatusFunc, {isError:changeStatusIsError, error:changeStatusError, isSuccess:changeStatusIsSuccess,data:changeStatus}] =useChangeStatusMutation()
    const [updateSurveyFunc,{isError:updateSurveyIsError, error:updateSurveyError, isSuccess:updateSurveyIsSuccess,data:updatesurvey}] = useUpdateSurveyMutation()
   
    const add = async (e) => { 
            //e.preventDefault(); 
            console.log(questions);        
       await addSurveyFunc({title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,age:ages,questions:questions}).then(()=>refetch())
     // await  console.log(survey);
     // await edit()
      // await updateSurveyFunc({_id:survey._id,title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,age:ages}).then(()=>refetch()) 
       setVisibleNew(false)
    }
    const edit = async (e) => {
        console.log(survey);
                //e.preventDefault();
            await updateSurveyFunc({_id:survey.data._id,title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,age:ages}).then(()=>refetch()) 
            setVisibleNew(false)
        }
    const changestatus = (e) => {
      // e.preventDefault();
       changeStatusFunc({_id:survey.data._id,status:"in process"}).then(()=>refetch())
       }

    const addQuestion=async()=>{
       setQuestions([...questions,{body:' ',answers:[{body:' '}]}])
       //await addQuestionFunc({_id:survey.data._id,body:'enter question'}).then(()=>refetch())
       // console.log(survey?.data?.questions);
       setQuest(true)
    }
    const toggleBtnRef = useRef(null);
    let [icon,setIcon] =useState('pi pi-save')
    const changeIcon=()=>{
        icon==='pi pi-save'?setIcon('pi pi-send'):setIcon('pi pi-save')
    }
    const checkType=()=>{
        ed===false?add():edit()
        changeIcon()
    }
    //const d=new Date()
    const sex = [
        { name: 'זכר', code: '1' },
        { name: 'נקבה', code: '2' }
    ];
    const sector = [ 
        { name: "דתי לאומי", code: '11' },
        { name: 'חילוני', code: '12' },
        { name: 'חרדי', code: '13' },
        { name: "לא משתייך", code: '14' },
        { name: 'מסורתי', code: '15' }
    ];
    const [ages, setAges] = useState([0,120]);
  
    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };
    return(
        <>
        <div className="card" >
        <div>
            <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
            <InputText ref={title} onChange={(e)=>setText(e.value)} defaultValue={title.current.value}/>
        </div>
        <div className="card flex justify-content-center">
            <Dropdown value={selectedSex} onChange={(e) => setSelectedSex(e.value)} options={sex} optionLabel="name" placeholder="Select a sex" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>  
        <div className="card flex justify-content-center">
            <div className="w-14rem">
                <label>Select an ages range</label>
                <InputText value={ages} onChange={(e) => setAges(e.target.value)} className="w-full" disabled/>
                <Slider value={ages} onChange={(e) => setAges(e.value)} className="w-14rem" range step={10}min={0}max={120}/>
            </div>
        </div> 
        <div className="card flex justify-content-center">
            <Dropdown value={selectedSector} onChange={(e) => setSelectedSector(e.value)} options={sector} optionLabel="name" placeholder="Select a sector" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div>
        </div>
        {questions?.map((q,i)=><Question question={q}questions={questions}index={i}/*survey={surveyQuestion.data}*/ refetch={refetch}/>)} 
        <Button onClick={async()=>{addQuestion()}} icon="pi pi-plus" rounded /> 
        <Button onClick={()=>{changestatus();setVisibleNew(false)}} icon="pi pi-send" rounded/> 
        <Button onClick={add} icon="pi pi-save"disabled={text!=null} rounded /> 
        </>
    )
}
export default AddSurvey