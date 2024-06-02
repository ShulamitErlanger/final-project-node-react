import { ScrollTop } from 'primereact/scrolltop';
import { useGetSurveysQuery } from '../surveys/surveyApiSlice';
import UserSurveyItem from './UserSurveyItem';
import { useGetUserQuery } from './userApiSlice';
import { Button } from 'primereact/button';
import { useState } from 'react';
const UserSurveys=(props)=>{
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
    isSuccess:survesIsSuccess,
    refetch
    } = useGetSurveysQuery({status:status})
    let filteredSurveys=[]

const filt=()=>{
filteredSurveys=surveys?.filter(s=>((s.sex===myUser?.sex || s.sex==='לא מוגבל') && (s.sector===myUser?.sector || s.sector==='לא מוגבל') && (s.age[0]<=age&&s.age[1]>=age||s.age==='') ) && (myUser?.surveys?.find(us=>us===s._id)==undefined))}
    const token=localStorage.getItem('token')

    const d = new Date(myUser?.birthDate);
    const y1=d.getFullYear()
    const y2=new Date().getFullYear()
    const age=(y2-y1)
    filt(); 
    const [visible1,setVisible1]=useState(false)
   /// surveys?.forEach(s=>console.log(s.gender,' ',s.sector,' ',s.title))
   // filteredSurveys=surveys?.filter(s=>(s.gender===myUser?.gender || s.gender==='לא מוגבל')&& (s.sector===myUser.sector || s.sector==='לא מוגבל') && s.age[0]<=age&&s.age[1]>=age)
    if (isLoading) return <h1>Loading</h1>
    if(isError) return <h2>{error}</h2>


    return (
        <>
        <div className="cardSurvey" id='cardSurveyId'>
            {filteredSurveys?.map((s)=><UserSurveyItem refetch ={refetch} survey={s} user={myUser}/>)}
            <ScrollTop />
        </div>
         </>
    )
}
export default UserSurveys
