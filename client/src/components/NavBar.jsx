import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';

const NavBar=(props)=> {
    const{login,admin}=props
    const navigate=useNavigate()

   
    let items=[]
if(login){

if(admin)
     items = [
        { label: 'home', icon: 'pi pi-home',url:'/' },
         { label: 'user surveys', icon: 'pi pi-list',url:'/UserSurveys' },
        { label: 'surveys', icon: 'pi pi-inbox',url:'/surveys' },
        { label: 'surveys segmentation', icon: 'pi pi-inbox',url:'/surveySegmentation' },
        { label: 'segmented', icon: 'pi pi-inbox',url:'/segments' }
    ];
else
    items = [
        { label: 'home', icon: 'pi pi-home',url:'/' },
        // { label: 'login', icon: 'pi pi-check-circle',url:'/login'},
        { label: 'userSurveys', icon: 'pi pi-list',url:'UserSurveys'},
        { label: 'segmented', icon: 'pi pi-inbox',url:'/segments' }
    ];
}
else
items = [
    { label: 'home', icon: 'pi pi-home',url:'/'},
    { label: 'login', icon: 'pi pi-check-circle',url:'/login'},
    { label: 'מי אנחנו', icon: 'pi pi-inbox',url:'/we'}
];

    return (
        <div className="card">
            <TabMenu model={items} />
            {console.log("admin:",admin,", login:",login)}
        </div>
    )
}
         

export default NavBar