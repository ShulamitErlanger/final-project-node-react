
import logo from '../logo.svg';
import '../App.css';
import {Link, useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../index.css";
import DecodeToken from './DecodeToken';
import apiSlice from '../app/apiSlice';
import { Menubar } from 'primereact/menubar';
export default function TemplateDemo() {
    const navigate=useNavigate();
    const decodeToken=DecodeToken()
   const users=decodeToken?.roles
    const itemRenderer = (item) => (
        <Link to={item.label=='יציאה' ? isUserLoggedIn?item.url:item.secondUrl:item.url}> 
            <span className="mx-2" class="bar">{item.label=='יציאה' ? isUserLoggedIn?item.label:item.secondLabel:item.label}</span>
            <span className={item.label=='יציאה' ? isUserLoggedIn?item.icon:item.secondIcon:item.label=='משתמשים'? users && item.icon :item.icon} style={{color:'white'}} />
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.icon}</span>}
        
        </Link>
   
    );
   
   
    const items = users==='admin'?[
                { label: 'דף הבית', icon: 'pi pi-home',template: itemRenderer,url:'/' },
                {
                    label: 'יציאה',secondLabel:'התחברות',icon: 'pi pi-sign-out',
                    secondIcon:'pi pi-sign-in',
                    template: itemRenderer,
                    url: 'logout',
                    secondUrl:'login',
                },
                { label: 'סקרים למשתמשים', icon: 'pi pi-list',template: itemRenderer,url:'/UserSurveys'},
                { label: 'כל סקרים', icon: 'pi pi-inbox',template: itemRenderer,url:'/Surveys' },
                { label: 'סקרים לפילוח', icon: 'pi pi-inbox',template: itemRenderer,url:'/surveySegmentation' },
                { label: 'סקרים מפולחים', icon: 'pi pi-inbox',template: itemRenderer,url:'/surveySegmentation'},
                { label: '?מי אנחנו', icon: 'pi pi-inbox',template: itemRenderer,url:'/we'}
            ]:users==='user'?[
                { label: 'דף הבית', icon: 'pi pi-home',template: itemRenderer,url:'/' },
                {
                    label: 'יציאה',secondLabel:'התחברות',icon: 'pi pi-sign-out',
                    secondIcon:'pi pi-sign-in',
                    template: itemRenderer,
                    url: 'logout',
                    secondUrl:'login',
                },
                { label: 'סקרים למשתמשים', icon: 'pi pi-list',template: itemRenderer,url:'/UserSurveys'},
                { label: 'סקרים מפולחים', icon: 'pi pi-inbox',template: itemRenderer,url:'/surveySegmentation'},
                { label: '?מי אנחנו', icon: 'pi pi-inbox',template: itemRenderer,url:'/we'}
            ]:[
                { label: 'דף הבית', icon: 'pi pi-home',template: itemRenderer,url:'/' },
                {
                    label: 'יציאה',secondLabel:'התחברות',icon: 'pi pi-sign-out',
                    secondIcon:'pi pi-sign-in',
                    template: itemRenderer,
                    url: 'logout',
                    secondUrl:'login',
                },
                { label: '?מי אנחנו', icon: 'pi pi-inbox',template: itemRenderer,url:'/we'}
            ]
       

    const navBarlogo = <video alt="logo" src={logo} height="50" className="mr-2" autoPlay muted loop  onClick={()=>{navigate('/')}}></video>;

    const {isUserLoggedIn} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    return (
        <div className="nav">
            <Menubar model={items} end={navBarlogo} />
        </div>
    )
}