import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useGetSurveysQuery } from './surveyApiSlice';
import Survey from './Survey';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import SurveyItem from './SurveyItem';
import { ScrollTop } from 'primereact/scrolltop';
import AddSurvey from './AddSurvey';
import { Checkbox } from 'primereact/checkbox';
const Surveys=(props)=>{

const {data :surveys=[],isLoading,isError,error, refetch}= useGetSurveysQuery({status:''})

const [visibleNew, setVisibleNew] = useState(false);
// const [ingredients, setIngredients] = useState([]);
// const[filteredSurveys,setFilteredSurveys]=useState(surveys)
// const onIngredientsChange = async(e) => {
//     let _ingredients = [...ingredients];

//     if (e.checked)
//        await _ingredients.push(e.value);
//     else
//        await _ingredients.splice(_ingredients.indexOf(e.value), 1);

//    await setIngredients(_ingredients);

//     setFilteredSurveys(surveys.filter(s=>ingredients.includes(s.status)))
// }
return (
    <>
   
    <div className="cardSurvey" > 
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 /*,width:'80%'*/ }}>
                <Button icon="pi pi-plus" style={{color:'#10bbbb', backgroundColor:'#e5e7eb', position:'fixed'}}label="&nbsp;סקר חדש&nbsp;" onClick={()=>{setVisibleNew(true)}}  rounded />
            </div>
            <div style={{ flex: 2/*,marginLeft:'25%'*/}}>
            {/* <div className="card flex flex-wrap justify-content-center gap-3">
            <div className="flex align-items-center">
                <Checkbox inputId="creating" name="status" value="creating" onChange={onIngredientsChange} checked={ingredients.includes('creating')} />
                <label htmlFor="creating" className="ml-2">ביצירה</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="in process" name="status" value="in process" onChange={onIngredientsChange} checked={ingredients.includes('in process')} />
                <label htmlFor="in process" className="ml-2">מפורסמים</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="closed" name="status" value="closed" onChange={onIngredientsChange} checked={ingredients.includes('closed')} />
                <label htmlFor="closed" className="ml-2">נעולים</label>
            </div>
            <div className="flex align-items-center">
                <Checkbox inputId="completed" name="status" value="completed" onChange={onIngredientsChange} checked={ingredients.includes('completed')} />
                <label htmlFor="completed" className="ml-2">מפולחים</label>
            </div>
        </div> */}
      
                {/* {filteredSurveys.map((s)=><SurveyItem survey={s}refetch={refetch}/>)} */}
                {surveys.map((s)=><SurveyItem survey={s}refetch={refetch}/>)}
                <Dialog visible={visibleNew} style={{ width: '80vw', height:'200vw' }} onHide={() => setVisibleNew(false)}>
                <p className="m-0">
                    <AddSurvey setVisibleNew={setVisibleNew} refetch={refetch}/>
                </p>
                </Dialog> 
                <ScrollTop/>
            </div>
        </div>
    </div>
</>

)

}
export default Surveys


