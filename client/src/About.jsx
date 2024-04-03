import BarSeg from "./components/features/surveys/BarSeg"
import LineSeg from "./components/features/surveys/LineSeg"
import PieSeg from "./components/features/surveys/PieSeg"
import { useGetUsersQuery } from "./components/features/users/userApiSlice"

const About=()=>{
    const sexLabels=['זכר','נקבה']
    const sectorLabels=['חרדי','חילוני','מסורתי','דתי לאומי','לא משתייך']
    const agesLabels=['0-10','0-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100','100-120']

    let countSex=[0,0];
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
        // users.foreach((u)=>{
        //     u.sector==='חרדי'?countSector[0]++:u.sector==='חילוני'?countSector[1]++:u.sector==='מסורתי'?countSector[2]++:u.sector==='דתי לאומי'?countSector[3]++:u.sector==='לא משתייך'?countSector[4]++:'';
        //     u.sex==='זכר'?countSex[0]++:u.sex==='נקבה'?countSex[1]++:'';
        //     d-u.birthDate.getFullYear()>=10 && d-u.birthDate.getFullYear()<=0?countAge[0]++:''})
        return(
            <>
    <BarSeg labels={sexLabels} data={countSex} question={''}/>
    <PieSeg labels={sectorLabels} data={countSector} question={''}/>
    <LineSeg labels={agesLabels} data={countAge} question={''}/>
    </>
    )
}
export default About