import { Button } from "primereact/button"

import UserQuestion from "./UserQuestion"
import SegQuestion from "./SegQuestion"
const Segment=(props)=>{
    const {refetch,survey}=props
    return(
        <>
        <div style={{textAlign:'center',fontFamily:'Yehuda CLM'}}>
            <h1>{survey.title}</h1>
        </div>
        {survey?.questions.map(q=><SegQuestion refetch={refetch} question={q} survey={survey}/>)}
        </>
    )
}
export default Segment
