import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import Segment from './Segment'
const SegmentItem=(props)=> {
    const {refetch,survey}=props
    const [visible,setVisible]=useState(false)
    const endContent = (
       
                        <Button label="לצפיה בתוצאות הסקר"icon="pi pi-eye" className="p-button-rounded" style={{color:'#10aaaa',backgroundColor:'#e5e7eb'}}
                        onClick={()=>{setVisible(true)}}
                        ></Button>
                        

    );
   
    return (<>
       
        <div className="card" id='segg'>
            <Card>
            <h1 dir='rtl'>{survey.title}</h1>
           

<div className="card flex justify-content-center">
           
          
            <p style={{width:'30%',marginRight:0}}>
                {endContent}
            </p>
        </div></Card>
        </div>
     

        <Dialog 
             header="תוצאות הסקר"
            visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <p className="m-0">
                <Segment refetch={refetch}survey={survey}/>
            </p>
        </Dialog>
        </>
    );
   
}
export default SegmentItem