import { Button } from 'primereact/button';
// import { DataView } from 'primereact/dataview';
// import { Dropdown } from 'primereact/dropdown';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
// import { classNames } from 'primereact/utils';
import { ScrollTop } from 'primereact/scrolltop';
//import { surveyService } from './service/surveyService';
import { useEffect, useState } from 'react';
import { useGetSurveysQuery } from '../surveys/surveyApiSlice';
// import { Avatar } from 'primereact/avatar';
// import { Badge } from 'primereact/badge';
// import SurveyDialog from './SurveyDialog';
// import DeleteDialog from './DeleteDialog';
import UserSurvey from './UserSurvey';
import { Dialog } from 'primereact/dialog';
// import AddSurvey from './AddSurvey';
//import { Inplace, InplaceContent, InplaceDisplay } from 'primereact/inplace';
//import { InputText } from 'primereact/inputtext';
import SurveyItem from './UserSurveyItem';
const UserSurveys=()=>{
const status="in process";
const {
data:surveys,
isLoading,
isError,
error,
refetch
} = useGetSurveysQuery({status:status})
//const [currentSurvey,setCurrentSurvey]=useState('')
// const [edit,setEdit]=useState(false)
// const [add,setAdd]=useState(false)
// const [survey,setSurvey]=useState(false)
// const [visible,setVisible]=useState(false)
const [visible1,setVisible1]=useState(false)


//const [del,setDel]=useState(false)
// const [status,setStatus]=useState(false)


    // const [data,setData]=useState(surveys)
    // const [sortKey, setSortKey] = useState('');
    // const [sortOrder, setSortOrder] = useState(0);
    // const [sortField, setSortField] = useState('');
   

  

  

   
   
    // const itemTemplate = (survey, index) => {
    //     return ( 
            
    //         <div className="col-12" key={survey.id}>
               
    //             <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
    //                 {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/survey/${survey.image}`} alt={survey.name} /> */}
    //                 <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
    //                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
    //                         <div className="text-2xl font-bold text-900">{survey.title}</div>
                           
    //                         {/* <Rating value={survey.rating} readOnly cancel={false}></Rating> */}
    //                         <div className="flex align-items-center gap-3">
    //                             <span className="flex align-items-center gap-2">
    //                                 <span className="font-semibold">{survey.category}</span> 
    //                                 <Avatar icon={getIcon(survey)} className="mr-2" size="large" style={{color:getColor(survey)}} shape="circle" />


    //                             </span>
                               
                               

    //                         </div>
    //                     </div>
    //                     <div className="flex-auto">
                                    
    //                                 <Avatar className="p-overlay-badge" icon="pi pi-user" size="large" shape="circle">
    //                                     <Badge value={survey.count} size={'normal'} />
    //                                 </Avatar>
    //                             </div> 
                       
                        


    //                     {/* <Avatar className="p-overlay-badge" icon="pi pi-user" size="xlarge">
    //                      <Badge value="4" />
    //                      </Avatar> */}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // const listTemplate = (items) => {
    //     if (!items || items.length === 0) return null;

    //     let list = items.map((survey, index) => {
    //         return itemTemplate(survey, index);
    //     });
        
    //     return <div className="grid grid-nogutter">{list}</div>;
    // };
    if (isLoading) return <h1>Loading</h1>
    if(isError) return <h2>{error}</h2>
    return (
        <div className="cardSurvey">
            {/* <div className="card flex flex-column align-items-center" style={{ height: '2000px' }}>
        </div> */}
            
            {/* <Button  onClick={()=>{setVisible1(true); setCurrentSurvey(survey)}} */}
             {/* icon="pi pi-plus" className="p-button-rounded"  style={{color:'#10bbbb', backgroundColor:'#e5e7eb'}}></Button> */}
            {surveys.map((s)=><SurveyItem refetch ={refetch} survey={s}/>)}
            
                {/* <Dialog 
            
            visible={visible1} style={{ width: '50vw', height:'200vw' }} onHide={() => setVisible1(false)}>
        
                <p className="m-0">
                    <UserSurvey survey={{title:'', questions:[],answers:[]}} refetch={refetch} type={'add'}/>
                </p>
                </Dialog>  */}
            <ScrollTop />


            
        </div>
        
     
    )
}
export default UserSurveys


/*import React from 'react'; 
import { ScrollTop } from 'primereact/scrolltop';

export default function BasicDemo() {
    return (
        <div className="card flex flex-column align-items-center" style={{ height: '2000px' }}>
            <p>Scroll down the page to display the ScrollTo component.</p>
            <i className="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite" style={{ fontSize: '2rem' }}></i>
            <ScrollTop />
        </div>
    );
}*/