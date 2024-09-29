import React, { useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { useDeleteAnswerMutation, useUpdateAnswerMutation } from './answerApiSlice';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { AutoComplete } from 'primereact/autocomplete';
import { SplitButton } from 'primereact/splitbutton';

const Answer=(props)=> {
    const {index,qIndex,answer,refetch}=props
    let {questions}=props
    const del=(e)=>{
         questions[qIndex].answers.splice(index,1);
        refetch();
     
    }


    const answeRef = useRef(answer.body!=' '?answer.body:"תשובה חדשה");

    return (
        <div className="flex flex-center card p-fluid p-inputtext-lg" dir='rtl'>
        <div style={{width:'80%'}}>
        <InputText ref={answeRef} defaultValue={answeRef.current} onChange={()=>{questions[qIndex].answers[index].body=answeRef.current.value}}/></div>
        &nbsp;
        <Button icon='pi pi-trash'  onClick={del} style={{backgroundColor:"white", color:"#14B8A6", height:'50px',  width:'50px'}} rounded></Button>
     </div>
    );
}
export default Answer