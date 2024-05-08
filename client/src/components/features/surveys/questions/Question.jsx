import React, { useRef, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Answer from '../answers/Answer';
import { InputText } from 'primereact/inputtext';
import { useDeleteQuestionMutation, useUpdateQuestionMutation } from './questionApiSlice';
import { Toast } from 'primereact/toast';
import { SpeedDial } from 'primereact/speeddial';
import {useAddAnswerMutation}from '../answers/answerApiSlice'
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
const Question=(props)=> {
    const [updateQuestionFunc, {isError, error, isSuccess,data}] =useUpdateQuestionMutation()
    //const [deleteQuestionFunc, {isError1, error1, isSuccess1,data1}] =useDeleteQuestionMutation()
    //const [addAnswerFunc,{isError:addAnsIsError,error:addAnsError,isSuccess:addAnsIsSuccess,data:questionsAns}]=useAddAnswerMutation()
    const {question,index,survey,refetch}=props
    let {questions}=props 
   
   // const [text, setText] = useState();
    const update=()=>{
        updateQuestionFunc({_id:survey._id,questionId:question._id,body:body.current.value}).then(()=>refetch())
    }
    const del=()=>{
        console.log('index:',index);
        questions.splice(index,1);
        //deleteQuestionFunc({_id:survey._id,questionId:question._id}).then(()=>refetch())
    }
    const addAnswer=()=>{
        console.log(questions);
        questions[index].answers=[...questions[index].answers,{body:' '}]
        //addAnswerFunc({_id:survey._id,questionId:question._id,body:'enter answer'}).then(()=>refetch())
     }
    console.log(question.body,' 6666666666666666666666');
    const body=useRef(question.body)
    console.log(body.current/*.value*/,' 55555555555555555555');
    const toast = useRef(null);
   
    
    const items = [
        {
            label: 'Add',
            icon: 'pi pi-plus',
            command:async () => {
                await addAnswer()
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                refetch();
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: async() => {
                await del();
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                refetch();
            }
        },
       
    ];
    const toggleBtnRef = useRef(null);
    //let [icon,setIcon] =useState('pi pi-save')
    // const changeIcon=()=>{
    //     icon==='pi pi-save'?setIcon('pi pi-send'):setIcon('pi pi-save')
    // }
    
    return (
      
        <div className="card">
            <div style={{ position: 'relative', bottom:'50px', left:'10%', width:'10px' }}>
                <Toast ref={toast} />
                <SpeedDial model={items} direction="right" showIcon='pi pi-ellipsis-v' hideIcon="pi pi-ellipsis-v" style={{ top: 'calc(50% - 2rem)',MozTabSize:'50px' }} />  
            </div>
            <Accordion multiple activeIndex={[0]}>
            <AccordionTab header={<div className="card">
            <div>
            <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
            {/* <Button ref={toggleBtnRef} icon={icon} onClick={()=>{update();changeIcon()}}/>&nbsp;&nbsp; */}
            <InputText defaultValue={body.current} ref={body}
             onChange={()=>{
                console.log(body.current.value,' 000000000000000000');
                console.log(questions[index],' 111111111111111111');
                if(questions)
                    questions[index].body=body.current.value;
                }} />
           
        </div>          
            </div> }>
               
                {question?.answers?.map((a,i)=>
                <p className="m-0">
                    <Answer question={question} questions={questions} qIndex={index} index={i} survey={survey} answer={a} refetch={refetch}/>
                 </p> 
                  )}
             </AccordionTab>
             </Accordion>
        </div>
    )
}
export default Question