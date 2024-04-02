import { ScrollTop } from "primereact/scrolltop";
import { useGetSurveysQuery } from "./surveyApiSlice";
import SurveySegItem from './SurveySegItem'
const SegmentSurveys=()=>{
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
         {surveys.map((s)=><SurveySegItem survey={s}refetch={refetch}/>)}
         <ScrollTop />
        </>
    )
}
export default SegmentSurveys