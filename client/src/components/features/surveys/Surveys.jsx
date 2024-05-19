import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useGetSurveysQuery } from './surveyApiSlice';
import Survey from './Survey';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import SurveyItem from './SurveyItem';
import { ScrollTop } from 'primereact/scrolltop';
import AddSurvey from './AddSurvey';
const Surveys=()=>{

const {data :surveys=[],isLoading,isError,error, refetch}= useGetSurveysQuery({status:''})
const [sortKey, setSortKey] = useState('');
const [sortOrder, setSortOrder] = useState(0);
const [sortField, setSortField] = useState('');
const [visibleNew, setVisibleNew] = useState(false);
const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
];


const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        setSortOrder(-1);
        setSortField(value.substring(1, value.length));
        setSortKey(value);
    } else {
        setSortOrder(1);
        setSortField(value);
        setSortKey(value);
    }
};

const header = () => {
    return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price"
     onChange={onSortChange} 
    className="w-full sm:w-14rem"/>;
};


return (
    <>
    <div /*style={{direction:'rtl'}}*/>
      <Button icon="pi pi-plus"label='סקר חדש' onClick={()=>{setVisibleNew(true)}}  rounded />
    {surveys.map((s)=><SurveyItem survey={s}refetch={refetch}/>)}
            <Dialog visible={visibleNew} style={{ width: '50vw', height:'200vw' }} onHide={() => setVisibleNew(false)}>
                <p className="m-0">
                    <AddSurvey setVisibleNew={setVisibleNew} refetch={refetch}/>
                </p>
            </Dialog> 
            <ScrollTop />
            </div>
</>
)

}
export default Surveys


