import React from 'react';
 const NodeService =()=> {
   const getTreeNodesData=() =>{
        return [

            {
                key: '1',
                label: 'Events1',
                data: 'Events Folder',
                icon: 'pi pi-fw pi-calendar',
                children: [
                    { key: '1-0', label: 'Meeting1', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
                    { key: '1-1', label: 'Product Launch1', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
                    { key: '1-2', label: 'Report Review1', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
                ]
            },
            {
                key: '2',
                label: 'Events2',
                data: 'Events Folder',
                icon: 'pi pi-fw pi-calendar',
                children: [
                    { key: '2-0', label: 'Meeting2', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
                    { key: '2-1', label: 'Product Launch2', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
                    { key: '2-2', label: 'Report Review2', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
                ]
            },
            {
                key: '3',
                label: 'Events3',
                data: 'Events Folder',
                icon: 'pi pi-fw pi-calendar',
                children: [
                    { key: '3-0', label: 'Meeting3', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
                    { key: '3-1', label: 'Product Launch3', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
                    { key: '3-2', label: 'Report Review3', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
                ]
            },

        ];}
    

return(
    <>
    {getTreeNodesData()}</>
)
 }
export default NodeService