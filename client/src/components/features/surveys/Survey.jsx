import { Button } from "primereact/button"
import {useAddQuestionMutation}from './questions/questionApiSlice'
import Question from "./questions/Question"
import { useRef, useState } from "react"
import {useChangeStatusMutation, useUpdateSurveyMutation } from "./surveyApiSlice"
import { InputText } from "primereact/inputtext"
import { StyleClass } from 'primereact/styleclass';
import { Dropdown } from 'primereact/dropdown';        
import { Slider } from "primereact/slider"
const Survey=(props)=>{
    const {survey,refetch,setVisible}=props
    //console.log(survey.sex);
    const [selectedSex, setSelectedSex] = useState({name:survey.sex,code:''});
    const [selectedSector, setSelectedSector] = useState({name:survey.sector,code:''});
    // const [selectedAge, setSelectedAge] = useState({name:survey.age,code:''});
    // const [selectedBirthDate, setSelectedBirthDate] = useState(Date);
    const title=useRef(survey.title)
    const [text,setText]=useState(survey.title)
   
    let [questions,setQuestions]=useState(survey.questions.map(q=>{return{_id:q._id,body:q.body,answers:q.answers.map(a=>{return{_id:a._id,body:a.body,createdAt:a.createdAt}}),createdAt:q.createdAt}}))
    //let [newQuestions,setNewQuestions]=useState([])
    //let [allQuestions,setAllQuestions]=useState([...questions,newQuestions])
    const [addQuestionFunc,{isError2,error2,isSuccess2,data:s}]=useAddQuestionMutation()
    const [changeStatusFunc, {isError1, error1, isSuccess1,data1}] =useChangeStatusMutation()
    const [updateSurveyFunc, {isError3, error3, isSuccess3,data3}] = useUpdateSurveyMutation()
    const changestatus = (e) => {
      // e.preventDefault();
       changeStatusFunc({_id:survey._id,status:"in process"}).then(()=>refetch())
       };

    const addQuestion=()=>{
        setQuestions([...questions,{_id:null,body:'qbody',answers:[{_id:null,body:'abody',createdAt:null}],createdAt:null}])
        //addQuestionFunc({_id:survey._id,body:' '}).then(()=>)
        refetch()
     }

    const edit = async (e) => {
        //e.preventDefault();
       // console.log(selectedSex.name);
       //console.log(newQuestions);
    await updateSurveyFunc({_id:survey._id,title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,age:ages,questions:questions/*,newQuestions:newQuestions*/}).then(()=>refetch()) 
   // await newQuestions.forEach(async q=>{await addQuestionFunc({_id:survey._id,body:q.body,answers:q.answers});console.log(q.body,' 1111111111111');})
    refetch()
}
    const toggleBtnRef = useRef(null);
    let [icon,setIcon] =useState('pi pi-save')
    const changeIcon=()=>{
        icon==='pi pi-save'?setIcon('pi pi-send'):setIcon('pi pi-save')
    }
    const d=new Date()
    const sex = [
        { name: 'לא מוגבל', code: '1' },
        { name: 'זכר', code: '2' },
        { name: 'נקבה', code: '3' }
    ];
    const sector = [
        { name: 'לא מוגבל', code: '10' },
        { name: "לא משתייך", code: '11' },
        { name: 'מסורתי', code: '12' },
        { name: "דתי לאומי", code: '13' },
        { name: 'חרדי', code: '14' }
    ];
    const [ages, setAges] = useState(survey.age);

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
<div className="card">
        <div>
            {/* <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
            <Button ref={toggleBtnRef} icon={icon} onClick={()=>{changeIcon();edit()}}/>&nbsp;&nbsp; */}
            <InputText ref={title} defaultValue={title.current}/>
        </div>

        <div className="card flex justify-content-center">
            <Dropdown value={selectedSex} onChange={(e) => setSelectedSex(e.value)} options={sex} optionLabel="name" placeholder={selectedSex.name||"Select a sex"} 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem"/>
        </div>  
       
        <div className="card flex justify-content-center">
            <Dropdown value={selectedSector} onChange={(e) => setSelectedSector(e.value)} options={sector} optionLabel="name" placeholder={selectedSector.name||"Select a sector" }
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div> 

        <div className="card flex justify-content-center">
            <div className="w-14rem">
                <label>Select an ages range</label>
                <InputText value={ages} onChange={(e) => setAges(e.target.value)} className="w-full" disabled/>
                <Slider value={ages} onChange={(e) => setAges(e.value)} className="w-14rem" range step={10}min={0}max={120}/>
            </div>
        </div>
       </div>
        {questions?.map((q,i)=><Question question={q} questions={questions}setQuestions={setQuestions} index={i}survey={survey} refetch={refetch}/>)}
        {/* {newQuestions?.map((q,i)=><Question question={q} questions={newQuestions} index={i}survey={survey} refetch={refetch}/>)} */}
        <Button onClick={()=>{addQuestion()}} icon="pi pi-plus" rounded /> 
        <Button onClick={()=>{changestatus();setVisible(false)}} icon="pi pi-send" rounded/> 
        <Button onClick={()=>{edit();setVisible(false);}} icon="pi pi-save" rounded /> 
        </>
    )
}
export default Survey