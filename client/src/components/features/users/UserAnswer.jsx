import React, { useState } from 'react';
import { RadioButton } from "primereact/radiobutton";
import { Toolbar } from 'primereact/toolbar';
// import { Button } from 'primereact/button';
// import { SplitButton } from 'primereact/splitbutton';
// import { InputText } from 'primereact/inputtext';
// import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
import {useChangeAnswerDataMutation, useDeleteAnswerMutation, useUpdateAnswerMutation} from '../surveys/answers/answerApiSlice'
import { Button } from 'primereact/button';



const UserAnswer=(props)=> {
    const {question,survey,refetch,answers}=props
   // let bodyAnswers=[{name:'',key:''}];
    // bodyAnswers.name=answers.map(a=>a.body)
    // bodyAnswers.key=answers.map(a=>a._id)

    let bodyAnswers=answers.map(a=>{return {key:a._id,name:a.body}});
    const categories = bodyAnswers
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    
    const [text, setText] = useState('');

     const [changeAnswerDataFunc, {isError1, error1, isSuccess1,data1}] = useChangeAnswerDataMutation()
    // var [visible, setVisible] = useState(true);

    const update = (e) => {
            //e.preventDefault();
            
            changeAnswerDataFunc({_id:survey._id,questionId:question._id,answerId:selectedCategory.key})};
    // const [delFunc, {isError, error, isSuccess,data}] = useDeleteAnswerMutation()
    // var [visible, setVisible] = useState(true);

    // const delet = (e) => {
    //     console.log("aaaddQuestion");
    //         //e.preventDefault();
    //         console.log(question._id);
    //         delFunc({_id:survey._id,questionId:question._id,answerId:answer._id}).then(()=>refetch())};
    
    
    
    // console.log("answer")
    // const items = [
    //     {
    //         label: 'Update',
    //         icon: 'pi pi-refresh' 
    //     },
    //     {
    //         label: 'Delete',
    //         icon: 'pi pi-times' 
    //     }
    // ];

    const startContent = (
        <React.Fragment>
        <Button icon="pi pi-check" onClick={update} rounded />
        </React.Fragment>
    );

    const centerContent = (
        <span classclassName="p-input-icon-left">
            {/* <i classclassName="pi pi-search" /> */}
            {/* <div >
            <Inplace closable closeIcon='pi pi-save' onClose={update} rounded>
                <InplaceDisplay>{text || "Click to edit"}</InplaceDisplay>
                <InplaceContent>
                    <InputText placeholder={answer.body} value={text} onChange={(e) => setText(e.target.value)} />
                </InplaceContent>
            </Inplace></div> */}
             <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
                {categories.map((category) => {
                    return (
                        <div key={category.key} className="flex align-items-center">
                            <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => setSelectedCategory(e.value)} checked={selectedCategory.key === category.key} />
                            <label htmlFor={category.key} className="ml-2">{category.name}</label>
                        </div>
                    );
                })}
            </div>
        </div>
       

            
        </span>
    );

    const endContent = (
        <React.Fragment>
            {/* <SplitButton label="Save" model={items} icon="pi pi-check" ></SplitButton> */}
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar start={startContent} center={centerContent} end={endContent} /> 
        </div>
    );
}
export default UserAnswer
/*
import React, { useState } from "react";

export default function DynamicDemo() {
   
    return (
       
    );
}
        */