
import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useDeleteSurveyMutation } from "./surveyApiSlice";

const DeleteDialog=(props)=>{
   const {survey,refetch}=props

   const [deleteFunc, {isError, error, isSuccess,data}] =
   useDeleteSurveyMutation()
   
   const del = (e) => {
   deleteFunc({_id:survey._id}).then(()=>refetch()) 

   };
   const toast = useRef(null);
    

   const accept = async () => {
      await del();
       toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
   };

   const reject = () => {
       toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
   };

   const showTemplate = () => {
       confirmDialog({
           group: 'templating',
           header: 'Confirmation',
           message: (
               <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                   <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                   <span>Please confirm to proceed moving forward.</span>
               </div>
           ),
           accept,
           reject
       });
   };

    return (
        <>
        <Toast ref={toast} />
            <ConfirmDialog group="templating" />
            <div className="card flex justify-content-center">
               {showTemplate()}
            </div>
        </>
    )
}
export default DeleteDialog