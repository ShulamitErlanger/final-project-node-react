import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { addLocale } from 'primereact/api';
import { Password } from 'primereact/password';
import { RadioButton } from "primereact/radiobutton";
import { useAddQuestionMutation, useUpdateQuestionMutation } from './questionApiSlice';


const QuestionDialog = (props) => {
    const {survey,type,questionId}=props  
    const body=useRef('')
  /**************************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!questionId************************************************/

    
   
//  const Add=()=>{
    const [addFunc, {isError, error, isSuccess,data,refetch}] = useAddQuestionMutation()
    var [visible, setVisible] = useState(true);

    const add = (e) => {
            //e.preventDefault();
        addFunc({_id:survey._id,body:body.current.value}).then(()=>refetch())};
    // add()}
   

//   const Edit=()=>{
//     const [editFunc, {isError, error, isSuccess,data}] = useUpdateQuestionMutation()
//     var [visible, setVisible] = useState(true);
//     const edit = (e) => {

//     //e.preventDefault();
//         editFunc({_id:survey._id,questionId:questionId, body:body.current.value})}
//     edit()}
    
// useEffect(()=>{
// if(isSuccess){
// dispatch(setToken(data))
// navigate("/blogs")
// }
// },[isSuccess])




const [value, setValue] = useState('');
const [date, setDate] = useState(null);
const [ingredient, setIngredient] = useState('');
   
//const [selectedCategory, setSelectedCategory] = useState(categories[1]);
return (
<div>
<div className="card flex justify-content-center">
            {/* <Button label="Login" icon="pi pi-user" onClick={() => setVisible(true)} /> */}
            <Dialog
           
                 visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                       
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="body" className="text-primary-50 font-semibold">
                                body
                            </label>
                            <InputText id="body" label="Body" className="bg-white-alpha-20 border-none p-3 text-primary-50"ref={body}></InputText>
                        </div>
                        
            
       
                        <div className="flex align-items-center gap-2">
                            <Button label="save" onClick={(e) => {hide(e); add()}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
</div>
);
;}
export default QuestionDialog;