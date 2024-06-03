import { ScrollTop } from 'primereact/scrolltop';
import { useGetSurveysQuery } from '../surveys/surveyApiSlice';
import UserSurveyItem from './UserSurveyItem';
import { useGetUserQuery } from './userApiSlice';
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
    refetch
    } = useGetSurveysQuery({status:status})
    const token=localStorage.getItem('token')

    const d = new Date(myUser?.birthDate);
    const y1=d.getFullYear()
    const y2=new Date().getFullYear()
    const age=(y2-y1)
    let filteredSurveys
    filteredSurveys=surveys?.filter(s=>(s.sex===myUser?.sex || s.sex==='לא מוגבל')&& (s.sector===myUser.sector || s.sector==='לא מוגבל') && s.age[0]<=age&&s.age[1]>=age)
    if (isLoading) return <h1>Loading</h1>
    if(isError) return <h2>{error}</h2>


    return (
        <>
        <div className="cardSurvey">
            {filteredSurveys?.map((s)=><UserSurveyItem refetch ={refetch} survey={s}/>)}
            <ScrollTop />
        </div>
         </>
    )
}
export default UserSurveys
