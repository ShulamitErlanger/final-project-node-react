import { Navigate } from 'react-router-dom'
import logo from "../components/logo/לדף הבית_1.mp4"
const HomePage=()=>{
    return(
        <>

        <video className="vi" alt="logo" src={logo} width={"60%"}autoPlay muted loop ></video>
       </>
       
    )
}
export default HomePage