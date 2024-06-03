import BarSeg from "./components/features/surveys/BarSeg"
import LineSeg from "./components/features/surveys/LineSeg"
import PieSeg from "./components/features/surveys/PieSeg"
import { useGetUsersQuery } from "./components/features/users/userApiSlice"

const About=()=>{
    const genderLabels=['זכר','נקבה']
    const sectorLabels=['חרדי','חילוני','מסורתי','דתי לאומי','לא משתייך']
    const agesLabels=['0-10','0-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100','100-120']

    let countGender=[0,0];
    let countSector=[0,0,0,0,0];
    let countAge=[0,0,0,0,0,0,0,0,0,0,0];
    const{
        data:users,
        isLoading:usersIsLoading,
        isError:usersIsError,
        error:usersError,
        isSuccess:usersIsSuccess,
        refetch:usersRefetch
        } = useGetUsersQuery()
        const d=new Date().getFullYear()
        return(
            <>
    <BarSeg labels={genderLabels} data={countGender} question={''}/>
    <PieSeg labels={sectorLabels} data={countSector} question={''}/>
    <LineSeg labels={agesLabels} data={countAge} question={''}/>
    </>
    )
}
export default About