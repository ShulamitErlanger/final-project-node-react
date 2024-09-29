import React, { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

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