import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { useDeleteSurveyMutation } from './surveyApiSlice';
import { Dialog } from 'primereact/dialog';
const DeleteDial=(props) =>{
    const {setVisible,visible,survey,refetch}=props
    const [deleteFunc,{isError,error,isSuccess,data}] = useDeleteSurveyMutation()
   
const del=async()=>{
    await deleteFunc({_id:survey._id}).then(()=>refetch())
    window.location.reload(true)
} 
const footerContent = (
    <div>
        <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        <Button label="Yes" icon="pi pi-check" onClick={() => {setVisible(false); del()}} autoFocus />
    </div>
);

    return (
        <>
             <div className="card flex justify-content-center">
            <Dialog visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <p className="m-0" style={{textAlign:'center'}}>
                    ?אתה בטוח שאתה רוצה למחוק
                </p>
            </Dialog>
        </div>
        </>
    )
}
export default DeleteDial