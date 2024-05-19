import React, { useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import { useDeleteAnswerMutation, useUpdateAnswerMutation } from './answerApiSlice';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { AutoComplete } from 'primereact/autocomplete';

const Answer=(props)=> {
    const {survey,question,qIndex,index,answer,refetch}=props
    let {questions}=props
    const [text, setText] = useState(answer.body);
    const [updateAnswerFunc, {isError, error, isSuccess,data}] =useUpdateAnswerMutation()
    const [deleteAnswerFunc, {isError1, error1, isSuccess1,data1}] =useDeleteAnswerMutation()
    const update=()=>{
        updateAnswerFunc({_id:survey._id,questionId:question._id,answerId:answer._id,body:text}).then(()=>refetch())
    }
    const del=async()=>{
        await questions[qIndex].answers.splice(index,1);
        refetch();
        //deleteAnswerFunc({_id:survey._id,questionId:question._id,answerId:answer._id}).then(()=>refetch())
    }
    const body=useRef(answer.body)
    const startContent = (
        <span classclassName="p-input-icon-left">
            {/* <i classclassName="pi pi-search" /> */}
            
        </span>
    );
    const toggleBtnRef = useRef(null);
    let [icon,setIcon] =useState('pi pi-save')
    // const changeIcon=()=>{
    //     icon==='pi pi-save'?setIcon('pi pi-send'):setIcon('pi pi-save')
    // }
    const centerContent = (
        <span classclassName="p-input-icon-left">
            {/* <i classclassName="pi pi-search" /> */}
            <div>
            {/* <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" /> */}
            {/* <Button ref={toggleBtnRef} icon={icon} onClick={()=>{update();changeIcon()}}/>&nbsp;&nbsp; */}
           
        </div>
        </span>
    );

    return (
        <div className="card p-fluid" /*p-inputtext-lg"*/ dir="rtl">
           <Button icon='pi pi-trash' rounded onClick={del}></Button>  
           <AutoComplete ref={body} defaultValue={body.current} onChange={()=>{questions[qIndex].answers[index].body=body.current.value}}/>
        </div>
    );
}
export default Answer