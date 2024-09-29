import React, { useRef, useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Answer from '../answers/Answer';
import { InputText } from 'primereact/inputtext';
import { useUpdateQuestionMutation } from './questionApiSlice';
import {useAddAnswerMutation}from '../answers/answerApiSlice'
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import './question.css'

const Question=(props)=> {
    const {question,index,survey,refetch}=props
    let {questions,setQuestions,newQuestions,setNewQuestions}=props 

    const delet=()=>{
        questions.splice(index,1);
        refetch()
    }
    const addAnswer=()=>{
        questions[index].answers=[...questions[index].answers,{body:'תשובה חדשה'}];
        refetch()
     }
    
    const bodyQ=useRef(question.body!=' '?question.body:"שאלה חדשה")
    const toast = useRef(null);
    const toggleBtnRef = useRef(null);
    const items = [
        
        {
            label: 'Add',
            icon: 'pi pi-plus',
            command: async() => {
                await addAnswer()
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });   
                 refetch();

            }
        },
        
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: async() => {
                await delet();
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                refetch();

            }
        },
       
    ];
    return (
        <div className="card">
             <div style={{ position: 'relative', bottom:'50px', left:'10%', width:'10px' }}>
         
     </div>
            <Accordion multiple activeIndex={[0]} style={{width:'100%'}}>
            <AccordionTab  header={question.body!=' '?question.body:"שאלה חדשה"}> 
            <div dir="rtl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button  label="&nbsp; הוסף תשובה " icon='pi pi-plus'rounded  id="iconn"style={{color:'#ffffff'}} onClick={addAnswer}> </Button> &nbsp;
          <Button label="&nbsp; מחק שאלה" icon='pi pi-trash' rounded onClick={delet} style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}></Button> </div>
           
            <div className="card p-fluid p-inputtext-lg" dir='rtl'>
            <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />

            <InputText ref={bodyQ}  defaultValue={bodyQ.current} onChange={()=>{if(questions){questions[index].body=bodyQ.current.value}}}/>
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


    
  
      
