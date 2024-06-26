import React, { useState } from 'react';
// import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
// import { SplitButton } from 'primereact/splitbutton';
// import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Steps } from 'primereact/steps';
import { Dialog } from 'primereact/dialog';
import Survey from './Survey';
import { Divider } from 'primereact/divider';
import DeleteDialog from './DeleteDialog';
import { useChangeStatusMutation } from './surveyApiSlice';
import SegSurvey from './SegSurvey';
import Segment from '../users/Segment';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
// import { current } from '@reduxjs/toolkit';

const SurveyItem=(props)=> {
    const {refetch,survey}=props
    const [visible,setVisible]=useState(false)
    const [visible1,setVisible1]=useState(false)
    const [visible2,setVisible2]=useState(false)
    const [del,setDel]=useState(false)
    const status=["creating","in process","closed","completed"]
    const [activeIndex, setActiveIndex] = useState(status.indexOf(survey.status));
    const [changeStatusFunc, {isError, error, isSuccess,data}] =useChangeStatusMutation()
   const changestatus = () => {
      // e.preventDefault();
       changeStatusFunc({_id:survey._id,status:"closed"}).then(()=>refetch())
       };
    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            
            <span
            className="inline-flex justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 cursor-pointer"
            style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px'}}
         onClick={() => statusFunc()}
        >
            <i className={`${item.icon} text-xl`} />
        </span>
        );
};
const statusFunc=()=>{
    survey.status==='creating'?setVisible(true):
    survey.status==='in process'?changestatus():
    survey.status==='closed'?setVisible1(true):
    setVisible2(true)
}

const items = [
    {
        icon: 'pi pi-wrench',
        template: (item) => itemRenderer(item, 0)
    },
    
    {
        icon: 'pi pi-lock',
        template: (item) => itemRenderer(item, 1)
    },
    {
        icon: 'pi pi-chart-line',
        template: (item) => itemRenderer(item, 2)
    },
{
        icon: 'pi pi-eye',
       template: (item) => itemRenderer(item, 3)
    },
];

    const startContent = (
        <React.Fragment>
           
             <Avatar className="p-overlay-badge" icon="pi pi-user" size="large" shape="circle" >
                            <Badge value={survey.count} size={'normal'}/>
                            </Avatar>
        </React.Fragment>
    );

    const centerContent = (
        <div  >
        <Steps model={items} activeIndex={activeIndex} readOnly={activeIndex+1} className="m-2 pt-4"
        />
   </div>
    );

    const endContent = (
        <React.Fragment>
            <div className="flex align-items-center gap-3">
                        <Button icon="pi pi-eraser"label='מחק סקר' className="p-button-rounded"style={{color:'#10aaaa',backgroundColor:'#e5e7eb'}}disabled={survey.status === 'in process'}
                        onClick={()=>{setDel(true); }}></Button> 
                    </div>
        </React.Fragment>
    );
   
    return (<>
       
        <div className="card" style={{width:'80%'}} >
            <Card>
            <h1>{survey.title}</h1>

        <div className="card flex justify-content-center">
        {/* <Toolbar start={startContent} center={centerContent} end={endContent}> */}
            <div style={{width:'30%'}}>
              {startContent}
            </div>
            <Divider layout="vertical" />
            <div style={{width:'30%'}}>
               {centerContent}
            </div>
            <Divider layout="vertical" />
            <div style={{width:'30%'}}>
                {endContent}
                 {del && <DeleteDialog visible={del} setVisible={setDel} refetch={refetch} survey={survey}/> }
            </div>
      
        {/* </Toolbar> */}
          </div>
        </Card>
        </div>
     
         
        <Dialog
            visible={visible} style={{ width: '70vw',height:'150vh' }} onHide={() => setVisible(false)}>
            <p className="m-0">
                <Survey refetch={refetch}survey={survey}setVisible={setVisible}/>
            </p>
        </Dialog>

        <Dialog
            visible={visible1} style={{ width: '50vw' }} onHide={() => setVisible1(false)}>
            <p className="m-0">
                <SegSurvey refetch={refetch}survey={survey}setVisible1={setVisible1}/>
            </p>
        </Dialog>

        <Dialog
            visible={visible2} style={{ width: '50vw' }} onHide={() => setVisible2(false)}>
            <p className="m-0">
                <Segment refetch={refetch}survey={survey}/>
            </p>
        </Dialog>
        </>
    );
   
}
export default SurveyItem