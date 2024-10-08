
import { Accordion, AccordionTab } from 'primereact/accordion';
import Answer from '../answers/Answer';
import React, { useRef, useState } from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { useDeleteQuestionMutation, useUpdateQuestionMutation } from './questApiSlice';
import { useAddAnswerMutation } from '../answers/ansApiSlice';

const Question=(props)=> {
const {refetch,question,survey}=props
const [addAnswerFunc,{isError:addAnswerIsError,error:addAnswerError,isSuccess:addAnswerIsSuccess,data:addAnswerData={}}]=useAddAnswerMutation()

 const addAnswer=()=>{
       addAnswerFunc({_id:survey._id,questionId:question._id,body:'enter answer'}).then(()=>refetch())
    }
const [updateQuestionFunc, {isError1, error1, isSuccess1,data1}] = useUpdateQuestionMutation()

    const update = (e) => {
        updateQuestionFunc({_id:survey._id,questionId:question._id,body:text})};
        const [delFunc, {isError, error, isSuccess,data}] = useDeleteQuestionMutation()

    const delet = (e) => {
            delFunc({_id:survey._id,questionId:question._id}).then(()=>refetch())};

    const toast = useRef(null);
    const [text, setText] = useState('');

    const items = [
        {
            label: 'Add',
            icon: 'pi pi-plus',
            command: async() => {
                await addAnswer()
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: async() => {
                await delet();
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },

    ];
    return (
        <div className="card">
            <Accordion multiple activeIndex={[0]}>

                <AccordionTab header={<div className="card">
            <Inplace closable closeIcon={'pi pi-save'} onClose={update}>
                <InplaceDisplay>{text || "Click to edit"}</InplaceDisplay>
                <InplaceContent>
                    <InputText placeholder={question.body} value={text} onChange={(e) => setText(e.target.value)}/>
                </InplaceContent>
            </Inplace>
       

                
            <div style={{ position: 'relative', bottom:'50px', left:'10%', width:'10px' }}>
                <Toast ref={toast} />
                
                <SpeedDial model={items} direction="right" style={{ top: 'calc(50% - 2rem)',MozTabSize:'50px' }} />
            </div> </div> }>
       
                {addAnswerData?.answers?.map(a=>
                <p className="m-0">
                    <Answer question={question} survey={survey} refetch={refetch} answer={a}/>
                 </p> 
                  )}
             </AccordionTab>
             </Accordion>
        </div>
    )
}
export default Question
