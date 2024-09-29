import { Button } from "primereact/button"
import { useRef, useState } from "react"
import Question from "./questions/Question"
import { useAddSurveyMutation, useUpdateSurveyMutation} from "./surveyApiSlice"
import { useAddQuestionMutation } from "./questions/questionApiSlice"
import { AutoComplete } from "primereact/autocomplete"
import { useFormik } from 'formik';
import { PanelMenu } from "primereact/panelmenu"
import { classNames } from "primereact/utils"
import SendSurvey from "./SendSurvey"
import { MultiSelect } from 'primereact/multiselect';
const AddSurvey=(props)=>{
    const {refetch,setVisibleNew}=props
    const [selectedGender, setSelectedGender] = useState()
    const [selectedSector, setSelectedSector] = useState()
    const [selectedBirthDate, setSelectedBirthDate] = useState(Date)
    const title=useRef('סקר ללא שם')
    const [text,setText]=useState('')
    const [ed,setEd]=useState(false)
    const [quest,setQuest]=useState(false) 
    let [questions,setQuestions]=useState([])
    const [send,setSend]=useState(false)
    const [addQuestionFunc,{isError:addQuestionIsError,error:addQuestionError,isSuccess:addQuestionIsSuccess,data:surveyQuestion}]=useAddQuestionMutation()
    const [updateSurveyFunc, {isError:updateSurveyIsError, error:updateSurveyError, isSuccess:updateSurveyIsSuccess,data:updatesurvey}] = useUpdateSurveyMutation()
    const [visibleS,setVisibleS]=useState(false);
    const [addSurveyFunc,{data:survey={},isError:addSurveyIsError,error:addSurveyError,isSuccess:addSurveyIsSuccess}]=useAddSurveyMutation()
    const add = async (e) => { 
        let selectSector;
    selectSector= await selectedSectors.map(select=>select.name)
let selectAge;
    selectAge= await selectedAges.map(age=>age.name)
       await addSurveyFunc({title:text,gender:selectedGender,sector:selectedSector,age:selectAge,questions:questions}).then(()=>refetch())
    }
    const toastCenter = useRef(null);
    const showMessage = (event, ref, severity) => {
        const label = event.target.innerText;
        ref.current.show({ severity: severity, summary: "שדה חובה", detail: "שדה כותרת הינו שדה חובה", life: 3000 });
    };
    const addQuestion=async()=>{
       setQuestions([...questions,{body:'שאלה חדשה',answers:[{body:'תשובה חדשה'}]}])
    }
    const gender = [
        { label: 'לא מוגבל',icon:'pi pi-circle',command:()=>{setSelectedGender('לא מוגבל')} },
        { label: 'זכר',command:()=>{setSelectedGender('זכר')} },
        { label: 'נקבה',command:()=>{setSelectedGender('נקבה')}}
    ];
    
    const [selectedSectors, setSelectedSectors] = useState(null);
    
    const sector = [
        { name: 'לא מוגבל'},
        { name: 'לא משתייך' },
        { name: 'מסורתי'},
        { name: 'חרדי'},
        { name: 'חילוני'},
        { name: 'דתי לאומי'}
    ];
    const [selectedAges, setSelectedAges] = useState(null);

    const ages = [
        { name: 'לא מוגבל'},
        { name: "0 - 10"},
        { name: "10 - 20" },
        { name: "20 - 30"},
        { name: "30 - 40"},
        { name: "40 - 50"},
        { name: "50 - 60"},
        { name: "60 - 70" },
        { name: "70 - 80"},
        { name: "80 - 90"},
        { name: "90 - 100"},
        { name: "100 - 120"}
    ];
    const items = [
        {
            label: selectedGender||'מגדר',
            icon: 'pi pi-user',
            items: gender
        }
        
    ]
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
    const formik = useFormik({
        initialValues: {
            title:survey.title
            
        },
        validate: (data) => {
            let errors = {};

            if (!data.title){
                errors.title = 'שדה חובה';
            }
           
            return errors;
        },
        onSubmit: async() => {
             await add();
             await setSend(true);
             refetch();
 
         }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

const getFormErrorMessage = (name) => {
return isFormFieldInvalid(name) ?  <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
}



    return(
        <>
        <div className="card p-fluid p-inputtext-lg" dir="rtl" style={{position:'sticky',top:0,zIndex:100,fontFamily:'Yehuda CLM'}}>
            <h2>שם הסקר</h2>
                <AutoComplete ref={title} defaultValue={title.current||'סקר ללא שם'}
                value={formik.values.title} 
                name='title'
                className={classNames({ 'p-invalid': isFormFieldInvalid('title') })}
                onChange={(e) => {
                    setText(e.value)
                    formik.setFieldValue('title', e.value);
                }}
                />
         
         {getFormErrorMessage('title')}      
        </div> 
        <div style={{ display: 'flex' }}>
            <div style={{ position: 'sticky', top: 200, height: '0vh', width: '300px',fontFamily:'Yehuda CLM'}}>
            <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?למי מיועד הסקר</h2>
            <div style={{alignItems:'center'}}>
        &nbsp;&nbsp; <PanelMenu model={items} className="w-full md:w-20rem"></PanelMenu>
         <div className="card flex justify-content-center">
            <MultiSelect value={selectedSectors} onChange={(e) => setSelectedSectors(e.value)} options={sector} optionLabel="name" display="chip" 
                placeholder={<div style={{color:"black",fontWeight:"bold",margin:"5px"}}><i className='pi pi-sort-numeric-up-alt'></i>&nbsp;&nbsp;מגזר</div>} maxSelectedLabels={5} className="w-full md:w-20rem" />
                
        </div>
        <div className="card flex justify-content-center">

        <MultiSelect id="multiSel"value={selectedAges} onChange={(e) => setSelectedAges(e.value)} options={ages} optionLabel="name" display="chip" 
                placeholder={<div style={{color:"black",fontWeight:"bold",margin:"5px"}}><i className='pi pi-sort-numeric-up-alt'></i>&nbsp;&nbsp;גיל</div>} maxSelectedLabels={5} className="w-full md:w-20rem" />  
                </div>
                </div>
    
    <Button label="הוסף שאלה" onClick={async()=>{addQuestion()}} icon="pi pi-plus" rounded style={{width:'50%',color:'#10bbbb', backgroundColor:'#e5e7eb',marginLeft:'19%'}}/> {/* This is the menu */}
    <br/><br/>
    <Button label="שמור סקר" type='submit' onClick={formik.handleSubmit /*setSend(true)*/} icon="pi pi-save" rounded style={{width:'50%',color:'#10bbbb', backgroundColor:'#e5e7eb',marginLeft:'19%'}}/> 
        </div>
        
      <div style={{ flex: 1, textAlign: 'center' }}> 
        {questions?.map((q,i)=><Question question={q} questions={questions} index={i} refetch={refetch}/>)} 

{send && <SendSurvey visible={send} setVisible={setSend} setVisibleS={setVisibleNew} refetch={refetch} survey={survey.data}/>}
</div> 
</div> 
        </>
        )
}
export default AddSurvey