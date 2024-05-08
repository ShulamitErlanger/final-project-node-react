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
    const d = new Date(myUser?.birthDate);
    const y1=d.getFullYear()
    const y2=new Date().getFullYear()
    const age=(y2-y1)
    let filteredSurveys
    filteredSurveys=surveys?.filter(s=>s.sex==myUser?.sex || s.sex=='' && s.sector==myUser.sector || s.sector=='' && s.age[0]<=age&&s.age[1]>=age||s.birthDate=='')
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
