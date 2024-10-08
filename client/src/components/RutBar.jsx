import '../App.css';
import {Link, useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import "../index.css";
import DecodeToken from './DecodeToken';
import { Menubar } from 'primereact/menubar';
export default function TemplateDemo() {
    const decodeToken=DecodeToken()
    const users=decodeToken?.roles
    const itemRenderer = (item) => (
        <Link class="link"to={item.label=='יציאה' ? isUserLoggedIn?item.url:item.secondUrl:item.url}> 
            <span className="mx-2" class="bar">{item.label=='יציאה' ? isUserLoggedIn?item.label:item.secondLabel:item.label}</span>
            <span className={item.label=='יציאה' ? isUserLoggedIn?item.icon:item.secondIcon:item.label=='משתמשים'? users && item.icon :item.icon} style={{color:'white'}} />
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.icon}</span>}
        
        </Link>
   
    );
   
   
    const items = users==='admin'?[
             
                {
                    class:"barIcon",
                    label: 'יציאה',secondLabel:'התחברות',icon: 'pi pi-sign-out',
                    secondIcon:'pi pi-sign-in',
                    template: itemRenderer,
                    url: 'logout',
                    secondUrl:'login',
                },
                { label: 'סקרים מפולחים', icon: 'pi pi-inbox',template: itemRenderer,url:'/segments'},
                { label: 'סקרים לפילוח', icon: 'pi pi-inbox',template: itemRenderer,url:'/surveySegmentation' },

                { label: 'סקרים למשתמשים', icon: 'pi pi-list',template: itemRenderer,url:'/UserSurveys'},

                { label: 'כל הסקרים', icon: 'pi pi-inbox',template: itemRenderer,url:'/Surveys' },

                { label: '?מי אנחנו', icon: 'pi pi-trophy',template: itemRenderer,url:'/we'},
                { id:"barIcon1",label: 'דף הבית', icon: 'pi pi-home',template: itemRenderer,url:'/' },
            ]:users==='user'?[
               
                {
                    label: 'יציאה',secondLabel:'התחברות',icon: 'pi pi-sign-out',
                    secondIcon:'pi pi-sign-in',
                    template: itemRenderer,
                    url: 'logout',
                    secondUrl:'login',
                },
               
                { label: 'סקרים מפולחים', icon: 'pi pi-inbox',template: itemRenderer,url:'/segments'},
                { label: 'סקרים למשתמשים', icon: 'pi pi-list',template: itemRenderer,url:'/UserSurveys'},
                { label: '?מי אנחנו', icon: 'pi pi-trophy',template: itemRenderer,url:'/we'},
                { label: 'דף הבית', icon: 'pi pi-home',template: itemRenderer,url:'/user' },
            ]:[
                
                {class:"barIcon",
                    label: 'יציאה',secondLabel:'התחברות',icon: 'pi pi-sign-out',
                    secondIcon:'pi pi-sign-in',
                    template: itemRenderer,
                    url: 'logout',
                    secondUrl:'login',
                },
                { class:"barIcon",label: '?מי אנחנו', icon: 'pi pi-trophy',template: itemRenderer,url:'/we'},
                { class:"barIcon",label: '!דף הבית', icon: 'pi pi-home',template: itemRenderer,url:'/user' },
            ]
       

   
    const {isUserLoggedIn} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    return (
        <div className="nav">
            <Menubar model={items} />
        </div>
    )
}