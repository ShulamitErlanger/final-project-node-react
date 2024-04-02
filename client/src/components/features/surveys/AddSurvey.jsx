const AddSurvey=()=>{
    const {refetch,setVisible}=props
    let {type}=props
    const [ed,setEd]=useState(type==='edit')
    const title=useRef(survey.title)
    const [text,setText]=useState(survey.title)
    const [addSurveyFunc,{data:survey={},isError,error,isSuccess,}]=useAddSurveyMutation()
    const [addQuestionFunc,{isError2,error2,isSuccess2,data:s}]=useAddQuestionMutation()
    const [changeStatusFunc, {isError1, error1, isSuccess1,data1}] =useChangeStatusMutation()
    const [updateSurveyFunc, {isError3, error3, isSuccess3,data3}] = useUpdateSurveyMutation()
    const changestatus = (e) => {
      // e.preventDefault();
       changeStatusFunc({_id:survey._id,status:"in process"}).then(()=>refetch())
       };
    const addQuestion=()=>{
        addQuestionFunc({_id:survey._id.data,body:text}).then(()=>refetch())
     }
    const add = async (e) => { 
            //e.preventDefault(); 
        type ='edit'
       await addSurveyFunc({title:title.current.value}).then(()=>refetch())
       setEd(true)
    };
    const edit = async (e) => {
        
            //e.preventDefault();
         type='edit'
        await updateSurveyFunc({_id:survey._id,title:title.current.value}).then(()=>refetch())
       
    };
    const toggleBtnRef = useRef(null);
    let [icon,setIcon] =useState('pi pi-save')
    const changeIcon=()=>{
        icon==='pi pi-save'?setIcon('pi pi-send'):setIcon('pi pi-save')
    }
    const checkType=()=>{
        type==='add'?add():edit();changeIcon()
    }
    return(
        <>
        <div className="card" >
        <div>
            <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
            <Button ref={toggleBtnRef} icon={icon} onClick={()=>{icon==='pi pi-save'?checkType():changeIcon()}}/>&nbsp;&nbsp;
            <InputText ref={title}onChange={(e)=>setText(e.value)} defaultValue={title.current.value}/>
        </div>
       </div>
        {ed&&surveyId?.questions.map(q=><Question question={q} survey={survey}surveyId={surveyId.data}refetch={refetch}/>)}
        <Button onClick={()=>{addQuestion()}} icon="pi pi-plus" rounded /> 
        <Button onClick={()=>{changestatus();setVisible(false)}} icon="pi pi-send" rounded/> 

        </>
    )
}
export default AddSurvey