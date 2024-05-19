import { Button } from "primereact/button"
import { useRef, useState } from "react"
import Question from "./questions/Question"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { useAddSurveyMutation, useChangeStatusMutation, useUpdateSurveyMutation } from "./surveyApiSlice"
import { useAddQuestionMutation } from "./questions/questionApiSlice"
import { Slider } from "primereact/slider"
import { Toast } from "primereact/toast"
import { AutoComplete } from "primereact/autocomplete"
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { Accordion, AccordionTab } from "primereact/accordion"
import { PanelMenu } from "primereact/panelmenu"
const AddSurvey=(props)=>{
    const {refetch,setVisibleNew}=props
    const [ed,setEd]=useState(false)
    const [quest,setQuest]=useState(false) 
    const [selectedSex, setSelectedSex] = useState()
    const [selectedSector, setSelectedSector] = useState()
  //const [selectedAge, setSelectedAge] = useState({name:null,code:''});
  //const [selectedBirthDate, setSelectedBirthDate] = useState(Date)
    const title=useRef('סקר ללא שם')
    const [text,setText]=useState('')
    let [questions,setQuestions]=useState([])
    const [addSurveyFunc,{data:survey={},isError:addSurveyIsError,error:addSurveyError,isSuccess:addSurveyIsSuccess}]=useAddSurveyMutation()
    const [changeStatusFunc, {isError:changeStatusIsError, error:changeStatusError, isSuccess:changeStatusIsSuccess,data:changeStatus}] =useChangeStatusMutation()
    const [updateSurveyFunc,{isError:updateSurveyIsError, error:updateSurveyError, isSuccess:updateSurveyIsSuccess,data:updatesurvey}] = useUpdateSurveyMutation()
    const toastCenter = useRef(null);
    const add = async (e) => { 
            //e.preventDefault();  
       await addSurveyFunc({title:text,sex:selectedSex,sector:selectedSector,age:ages,questions:questions}).then(()=>refetch())
       console.log(survey);      
     // await  console.log(survey);
     // await edit()
      // await updateSurveyFunc({_id:survey._id,title:title.current.value,sex:selectedSex.name,sector:selectedSector.name,age:ages}).then(()=>refetch()) 
       setVisibleNew(false)
    }
    const edit = async (e) => {
        console.log(survey);
                //e.preventDefault();
            await updateSurveyFunc({_id:survey.data._id,title:title.current.value,sex:selectedSex,sector:selectedSector.name,age:ages}).then(()=>refetch()) 
            setVisibleNew(false)
        }
    const changestatus = async(e) => {
        await add()
        console.log(title.current.value);
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
        { label: 'לא מוגבל',icon:'pi pi-save',command:()=>{setSelectedSex('לא מוגבל')} },
        { label: 'זכר',icon:'pi pi-save',command:()=>{setSelectedSex('זכר')} },
        { label: 'נקבה',icon:'pi pi-save',command:()=>{setSelectedSex('נקבה')}}
    ];
    const sector = [
        { label: 'לא מוגבל',icon:'pi pi-save',command:()=>{setSelectedSector('לא מוגבל')} },
        { label: 'לא משתייך',icon:'pi pi-save',command:()=>{setSelectedSector('לא משתייך')} },
        { label: 'מסורתי',icon:'pi pi-save',command:()=>{setSelectedSector('מסורתי')}},
        { label: 'חרדי',icon:'pi pi-save',command:()=>{setSelectedSector('חרדי')}},
        { label: 'חילוני',icon:'pi pi-save',command:()=>{setSelectedSector('חילוני')}},
        { label: 'דתי לאומי',icon:'pi pi-save',command:()=>{setSelectedSector('דתי לאומי')}}
       
       
    ];
    const [ages, setAges] = useState([0,120]);
    const items = [
        {
            label: selectedSex||'מגדר',
            icon: 'pi pi-palette',
            items: sex
        },
        {
            label: selectedSector||'מגזר',
            icon: 'pi pi-palette',
            items: sector
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
           title:''
            
        },
        validate: (data) => {
            let errors = {};

            if (!data.title){
                errors.title = 'שדה חובה';
            }
           
            return errors;
        },
        onSubmit: () => {
           console.log('onSubmit');
            add();
        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

const getFormErrorMessage = (name) => {
return isFormFieldInvalid(name) ?  <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
}


    return(
        <>
        <div className="card" >

        <div className="card p-fluid p-inputtext-lg" dir="rtl">
        <AutoComplete ref={title} defaultValue={title.current||'סקר ללא שם'} 
        value={formik.values.title} /*placeholder={title.current}*/
        name='title'
                     className={classNames({ 'p-invalid': isFormFieldInvalid('title') })}
                     onChange={(e) => {
                        setText(e.value)
                         formik.setFieldValue('title', e.value);
                     }}
                 />
                 {getFormErrorMessage('title')}      
        </div> 
        <Button label="הוסף שאלה" onClick={async()=>{addQuestion()}} icon="pi pi-plus" rounded />
        
        <div className="card flex justify-content-center">
            <div className="w-14rem">
                <label>Select an ages range</label>
                <InputText value={ages} onChange={(e) => setAges(e.target.value)} className="w-full" disabled/>
                <Slider value={ages} onChange={(e) => setAges(e.value)} className="w-14rem" range step={10}min={0}max={120}/>
            </div>
        </div> 
        {/* <div className="card flex justify-content-center">
            <Dropdown value={selectedSector} onChange={(e) => setSelectedSector(e.value)} options={sector} optionLabel="name" placeholder="Select a sector" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
        </div> */}
        </div>
        
         <PanelMenu model={items} className="w-full md:w-20rem" ></PanelMenu>
        {questions?.map((q,i)=><Question question={q}questions={questions} index={i}/*survey={surveyQuestion.data}*/ refetch={refetch}/>)} 
     
        {/* <Button onClick={()=>{changestatus();setVisibleNew(false)}} icon="pi pi-send" rounded/>  */}
        <Button label="שמור" /*onClick={async(e)=>{if(text!=''){await add(); setVisible1(false)} else { showMessage(e, toastCenter, 'warn')}
            }} */ type='submit' onClick={formik.handleSubmit} icon="pi pi-save" rounded /> 
        </>
    )
}
export default AddSurvey