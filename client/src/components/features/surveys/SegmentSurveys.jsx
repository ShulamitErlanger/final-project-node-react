import { ScrollTop } from "primereact/scrolltop";
import { useGetSurveysQuery } from "./surveyApiSlice";
import SurveySegItem from './SurveySegItem'
const SegmentSurveys=(props)=>{
    const status="closed";
    const {
    data:surveys=[],
    isLoading,
    isError,
    error,
    refetch
    } = useGetSurveysQuery({status:status})
   
    return (
        <>
       <div className="cardSurvey" style={{marginTop:'130px'}}> 
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 /*,width:'80%'*/ }}>
            </div>
            <div style={{ flex: 2,marginRight:'15%'}}>
                {surveys.map((s)=><SurveySegItem survey={s}refetch={refetch}/>)}
                <ScrollTop/>
            </div>
        </div>
    </div>

         <ScrollTop />
        </>
    )
}
export default SegmentSurveys