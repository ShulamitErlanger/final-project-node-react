import logo from "../components/logo/userHomePage.mp4"
const HomePageUser=()=>{
    return(
        <>
<div className='homePage'>
        <video alt="logo" src={logo} width={"60%"} className="vi" autoPlay muted loop style={{marginTop:'200px'}}></video>
      </div> </>
       
    )
}
export default HomePageUser