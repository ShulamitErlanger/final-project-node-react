import { ScrollTop } from 'primereact/scrolltop';
import { useGetSurveysQuery } from '../surveys/surveyApiSlice';
import SurveyItem from './UserSurveyItem';
import { useGetUserQuery } from './userApiSlice';
import { useState } from 'react';
const UserSurveys=()=>{
const status="in process";
const{
    data:myUser,
    isLoading:userIsLoading,
    isError:userIsError,
    error:userError,
    isSuccess:userIsSuccess,
    refetch:userRefetch
    } = useGetUserQuery({id:''})
const {
data:surveys,
isLoading,
isError,
error,
refetch
} = useGetSurveysQuery({status:status})
let filteredSurveys
filteredSurveys=surveys?.filter(s=>s.sex==myUser.sex || s.sex=='' && s.sector==myUser.sector || s.sector=='' && s.birthDate>=myUser.birthDate||s.birthDate=='')
const [visible1,setVisible1]=useState(false)
    if (isLoading) return <h1>Loading</h1>
    if(isError) return <h2>{error}</h2>
    return (
        <div className="cardSurvey">
            {filteredSurveys?.map((s)=><SurveyItem refetch ={refetch} survey={s}/>)}
            <ScrollTop />
        </div>
        
     
    )
}
export default UserSurveys
