import React, { useRef, useState } from 'react';
import {useAddSurveyMutation, useUpdateSurveyMutation} from './surveyApiSlice'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
const SurveyDialog = (props) => {
    
const {type}=props
const title=useRef()
const [addFunc, {isError, error, isSuccess,data}] = useAddSurveyMutation()
var [visible, setVisible] = useState(true);

const add = (e) => {
    addFunc({title:title.current.value})};

return (
<div>
<div className="card flex justify-content-center">
            <Dialog
           
                 visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                       <h5>{type}</h5>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="title" className="text-primary-50 font-semibold">
                                title
                            </label>
                            <InputText id="name" label="Title" className="bg-white-alpha-20 border-none p-3 text-primary-50"ref={title}></InputText>
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
};
export default SurveyDialog;