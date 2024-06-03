import { Button } from "primereact/button"
import { useRef, useState } from "react"
import Question from "./questions/Question"
import { InputText } from "primereact/inputtext"
import { useAddSurveyMutation} from "./surveyApiSlice"
import { Slider } from "primereact/slider"
import { AutoComplete } from "primereact/autocomplete"
import { useFormik } from 'formik';
import { Accordion, AccordionTab } from "primereact/accordion"
import { PanelMenu } from "primereact/panelmenu"
import { classNames } from "primereact/utils"
import SendSurvey from "./SendSurvey"
const AddSurvey=(props)=>{
    const {refetch,setVisibleNew}=props
    const [selectedSex, setSelectedSex] = useState()
    const [selectedSector, setSelectedSector] = useState()
    const title=useRef('סקר ללא שם')
    const [text,setText]=useState('')
    let [questions,setQuestions]=useState([])
    const [send,setSend]=useState(false)
    const [addSurveyFunc,{data:survey={},isError:addSurveyIsError,error:addSurveyError,isSuccess:addSurveyIsSuccess}]=useAddSurveyMutation()
    const add = async (e) => { 
       await addSurveyFunc({title:text,sex:selectedSex,sector:selectedSector,age:ages,questions:questions}).then(()=>refetch())
    }
    const addQuestion=async()=>{
       setQuestions([...questions,{body:'שאלה חדשה',answers:[{body:'תשובה חדשה'}]}])
    }
    const sex = [
        { label: 'לא מוגבל',icon:'pi pi-circle',command:()=>{setSelectedSex('לא מוגבל')} },
        { label: 'זכר',command:()=>{setSelectedSex('זכר')} },
        { label: 'נקבה',command:()=>{setSelectedSex('נקבה')}}
    ];
    const sector = [
        { label: 'לא מוגבל',command:()=>{setSelectedSector('לא מוגבל')} },
        { label: 'לא משתייך',command:()=>{setSelectedSector('לא משתייך')} },
        { label: 'מסורתי',command:()=>{setSelectedSector('מסורתי')}},
        { label: 'חרדי',command:()=>{setSelectedSector('חרדי')}},
        { label: 'חילוני',command:()=>{setSelectedSector('חילוני')}},
        { label: 'דתי לאומי',command:()=>{setSelectedSector('דתי לאומי')}}   
    ];
    const [ages, setAges] = useState([0,120]);
    const items = [
        {
            label: selectedSex||'מגדר',
            icon: 'pi pi-user',
            items: sex
        },
        {
            label: selectedSector||'מגזר',
            icon: 'pi pi-tag',
            items: sector
        }
    ]

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
                <h2>&nbsp;&nbsp;&nbsp;?למי מיועד הסקר</h2>
                <PanelMenu model={items} className="w-full md:w-20rem"></PanelMenu>
                <Accordion className="w-full md:w-20rem">
                    <AccordionTab header={<div><i className='pi pi-sort-numeric-up-alt'></i>&nbsp;&nbsp;גיל</div>}>
                        <div>
                            <InputText value={ages} onChange={(e) => setAges(e.target.value)} className="w-full" disabled/>
                            <Slider value={ages} onChange={(e) => setAges(e.value)} className="w-17.5rem" range step={10}min={0}max={120}/>
                        </div>
                    </AccordionTab>
                </Accordion>
                <br/><br/>
                <Button label="הוסף שאלה" onClick={async()=>{addQuestion()}} icon="pi pi-plus" rounded style={{width:'50%',color:'#10bbbb', backgroundColor:'#e5e7eb',marginLeft:'19%'}}/>
                <br/><br/>
                <Button label="שמור סקר" type='submit' onClick={formik.handleSubmit} icon="pi pi-save" rounded style={{width:'50%',color:'#10bbbb', backgroundColor:'#e5e7eb',marginLeft:'19%'}}/> 
            </div> 
            <div style={{ flex:1 ,textAlign: 'center' }}>
                {questions?.map((q,i)=><Question question={q}questions={questions} index={i} refetch={refetch}/>)} 
                {send && <SendSurvey visible={send} setVisible={setSend} setVisibleS={setVisibleNew} refetch={refetch} survey={survey.data}status={"in process"}/>}
            </div>
        </div>
        </>
        )
}
export default AddSurvey