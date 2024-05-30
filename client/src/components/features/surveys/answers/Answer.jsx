import React, { useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { useDeleteAnswerMutation, useUpdateAnswerMutation } from './answerApiSlice';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { AutoComplete } from 'primereact/autocomplete';

const Answer=(props)=> {
    const {qIndex,index,answer,refetch}=props
    let {questions}=props
  
    const del=async()=>{
        await questions[qIndex].answers.splice(index,1);
        refetch();
     
    }
    const body=useRef(answer.body!=' '?answer.body:"תשובה חדשה")
  

    return (
        <div className="flex flex-center card p-fluid p-inputtext-lg" dir='rtl'>
           <div style={{width:'80%'}}>
           <InputText ref={body} defaultValue={body.current}onChange={()=>{questions[qIndex].answers[index].body=body.current.value}} /></div>&nbsp;&nbsp;&nbsp;&nbsp;
           <Button icon='pi pi-trash'  onClick={del} style={{color:'#10bbbb', backgroundColor:'#ffffff'}} rounded tooltip='מחק תשובה'></Button>
           
        </div>
    );
}
export default Answer