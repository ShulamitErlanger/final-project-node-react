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
import SegQuestion from '../SegQuestion';
import { Divider } from 'primereact/divider';
const Question=(props)=> {
    const [updateQuestionFunc, {isError, error, isSuccess,data}] =useUpdateQuestionMutation()

    const {question,index,survey,refetch,setQuestions}=props
    let {questions}=props 
    const del=()=>{
        questions.splice(index,1);
        refetch()
    }
    const addAnswer=()=>{
        questions[index].answers=[...questions[index].answers,{body:' '}];
        refetch()
     }
    
    const body=useRef(question.body!=' '?question.body:"שאלה חדשה")
    const toast = useRef(null);
    const toggleBtnRef = useRef(null);
    return (
        <div className="card">  
                <Accordion multiple activeIndex={[0]} style={{width:'100%'}}>
                <AccordionTab header={question.body!=' '?question.body:"שאלה חדשה"} > 
                <div dir="rtl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button label="&nbsp; הוסף תשובה " icon='pi pi-plus'rounded  onClick={addAnswer}> </Button> &nbsp;
              <Button label="&nbsp; מחק שאלה" icon='pi pi-trash' rounded onClick={del} style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}></Button> </div>
               
                <div className="card p-fluid p-inputtext-lg" dir='rtl'>
                <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
                <InputText ref={body}  defaultValue={body.current} onChange={()=>{if(questions){questions[index].body=body.current.value}}}/>
            </div> 

            <Divider></Divider>
            
                    {question?.answers?.map((a,i)=>
                    <p className="m-0">
                        <Answer question={question} questions={questions} qIndex={index} index={i} survey={survey} answer={a}refetch={refetch}/>
                     </p> 
                      )}
                 </AccordionTab>
                 </Accordion>
            </div>
    )
}
export default Question


    
  
      
