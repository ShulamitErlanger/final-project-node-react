import React, { useRef, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';

const UserQuestion=(props)=> {
const {select,setSelect,refetch,question,survey}=props
const index=select.indexOf(select.find(q=>q._id==question._id))
let bodyAnswers=question.answers.map(a=>{return {key:a._id,name:a.body}});
const categories = bodyAnswers
const [selectedCategory, setSelectedCategory]=useState(select[index].select||'');
    return (
        <div className="card">
           
              <div className="card flex justify-content-center">
            <h3>{question.body} </h3>
        </div>
           
        {categories.map((category) => {
                    return (
                        <span classclassName="p-input-icon-left">  
                            <Card>
                                <div key={category.key} className="flex align-items-center">
                                        <RadioButton inputId={category.key} name="category" value={category.key} onChange={(e) =>{select[index].select=e.value;setSelect(select);setSelectedCategory(e.value);console.log(selectedCategory);}} 
                                        checked={selectedCategory=== category.key} />
                                        <label htmlFor={category.key} className="ml-2">{category.name}</label>
                                </div>
                            </Card>
                        </span>               
                    );
                })}
                  </div>
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