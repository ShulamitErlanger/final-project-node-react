import { TabMenu } from "primereact/tabmenu";

const BaseNavBar=()=>{
        const items = [
            { label: 'home', icon: 'pi pi-home',url:'/'},
            { label: 'login', icon: 'pi pi-check-circle',url:'/login'},
            { label: 'מי אנחנו', icon: 'pi pi-inbox',url:'/we'}
        ];
    
        return (
            <div className="card"style={{position:"fixed"}}>
                <TabMenu model={items} />
            </div>
        )
}
export default BaseNavBar