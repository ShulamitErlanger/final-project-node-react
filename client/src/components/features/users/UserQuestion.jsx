import React, { useRef, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';

const UserQuestion=(props)=> {
const {select,setSelect,refetch,question,survey,index}=props
//const index=select.indexOf(select.find(q=>q._id==question._id))
let bodyAnswers=question.answers.map(a=>{return {key:a._id,name:a.body}});
const categories = bodyAnswers
const [selectedCategory, setSelectedCategory]=useState(select[index].select||'');
    return (<>
        <Fieldset legend={<span style={{fontFamily:'Yehuda CLM',minWidth:'160px', textAlign:'center',minHeight:'15px', fontSize:'20px'}}>{question.body} </span>}>
            <p className="m-0"  >
                <div className="card">  
                    {categories.map((category) => {
                        return (
                            <div key={category.key} className="flex align-items-center">
                                    <RadioButton inputId={category.key} name="category" value={category.key} onChange={(e) =>{select[index].select=e.value;setSelect(select);setSelectedCategory(e.value);console.log(selectedCategory);}} 
                                    checked={selectedCategory=== category.key} />
                                    <label htmlFor={category.key} className="ml-2">{category.name}</label><br/><br/><br/>
                            </div>          
                    );
                })} </div>
            </p>
        </Fieldset><br/><br/><br/>
</>
    )
}
export default UserQuestion


/*
import React from 'react'; 

export default function DisabledDemo() {
    return (
      
    )
}
        



        */