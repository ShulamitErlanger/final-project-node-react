import { TabMenu } from "primereact/tabmenu";
//import { useGetUserQuery } from "./userApiSlice"

const UsersNavBar=(props)=>{
    //const {myUser}=props
    // const{
    //     data:myUser,
    //     isLoading:userIsLoading,
    //     isError:userIsError,
    //     error:userError,
    //     isSuccess:userIsSuccess,
    //     refetch:userRefetch
    //     } = useGetUserQuery({id:''})
        const items = [
            { label: 'home', icon: 'pi pi-home',url:'/' },
            { label: 'login', icon: 'pi pi-check-circle',url:'/login'},
            { label: 'userSurveys', icon: 'pi pi-list',url:'UserSurveys'},
            { label: 'segmented', icon: 'pi pi-inbox',url:'/segments' }
        ];
    
        return (
            <div className="card">
                <TabMenu model={items} />
            </div>
        )
}
export default UsersNavBar