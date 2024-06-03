import { useEffect, useState } from "react";
import BarSeg from "./BarSeg";
import LineSeg from "./LineSeg";
import PieSeg from "./PieSeg";

const Data=(props)=>{
   
    const {feature,labels,question,bar,pie,line}=props
    let {data}=JSON.parse(JSON.stringify(props))
    const [colorsGroup,setColorsGroup]=useState(['rgb(20, 220, 185)',
    'rgb(20, 200, 200)',
    'rgb(20, 150, 255)',
    'rgb(20, 220, 185)',
    'rgb(20, 200, 200)',
    'rgb(20, 150, 255)',
    'rgb(20, 160, 240)'

    ])
    const divideData=()=>{
        if(feature==null){
             data = {
                labels: labels,
                datasets: [
                    {
                        label: question.body,
                        backgroundColor: colorsGroup,
                        borderColor: 'rgb(20, 200, 200)',
                        data: data.map(a=>a.sector.haradi)
                    }]}
        }
        if(feature==='מגזר'){
             data = {
                labels: labels,
                datasets: [
                    {
                        label: 'חרדי',
                        backgroundColor: 'rgb(20, 200, 200)',
                        borderColor: 'rgb(20, 200, 200)',
                        data: data.map(a=>a.sector.haradi)
                    },
                    {
                        label: 'חילוני',
                        backgroundColor: 'rgb(20, 150, 255)',
                        borderColor: 'rgb(20, 150, 255)',
                        data: (data.map(a=>a.sector.hiloni))
                    },
                    {
                     label: 'דתי לאומי',
                     backgroundColor: 'rgb(20, 220, 185)',
                     borderColor: 'rgb(20, 220, 185)',
                     data: (data.map(a=>a.sector.datal))
                 },
                 {
                     label: 'מסורתי',
                     backgroundColor: 'rgb(54, 162, 235)',
                     borderColor: 'rgb(54, 162, 235)',
                     data: (data.map(a=>a.sector.masorty))
                 },
                 {
                     label: 'לא משתייך',
                     backgroundColor: 'rgb(75, 192, 192)',
                     borderColor: 'rgb(75, 192, 192)',
                     data: (data.map(a=>a.sector.loMeshtaieh))
                 },
     
                ]
            };
        }
        else if(feature==='מגדר'){
            data={
                labels: labels,
                datasets: [
                    {
                        label: 'גברים',
                        backgroundColor: 'rgb(20, 200, 200)',
                        borderColor: 'rgb(20, 200, 200)',
                        data: (data.map(a=>a.gender.male))
                    },
                    {
                        label: 'נשים',
                        backgroundColor: 'rgb(20, 150, 255)',
                        borderColor: 'rgb(20, 150, 255)',
                        data: (data.map(a=>a.gender.female))
                    }
                ]
            };
        }
        else if(feature==='גיל'){
            data={
                labels: labels,
                datasets: [
                    {
                        label: '0-10',
                        backgroundColor: 'rgb(20, 200, 200)',
                        borderColor: 'rgb(50, 230, 230)',
                        data: (data.map(a=>a.age.tens))
                    },
                    {
                        label: '10-20',
                        backgroundColor: 'rgb(20, 150, 255)',
                        borderColor: 'rgb(50, 180, 285)',
                        data: (data.map(a=>a.age.twentys))
                    },
                    {
                     label: '20-30',
                     backgroundColor: 'rgb(20, 220, 185)',
                     borderColor: 'rgb(50, 250, 215)',
                     data: (data.map(a=>a.age.thirdys))
                 },
                 {
                     label: '30-40',
                    backgroundColor: 'rgb(54, 162, 235)',
                     borderColor: 'rgb(84, 192, 265)',
                     data: (data.map(a=>a.age.fourthys))
                 },
                 {
                     label: '40-50',
                     backgroundColor: 'rgb(75, 192, 192)',
                     borderColor: 'rgb(75, 192, 192)',
                     data: (data.map(a=>a.age.fiftys))
                 },
                 {
                    label: '50-60',
                    backgroundColor: 'rgb(95, 212, 212)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: (data.map(a=>a.age.sixtys))
                },
                {
                    label: '60-70',
                    backgroundColor: 'rgb(115, 232, 232)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: (data.map(a=>a.age.seventys))
                },
                {
                    label: '70-80',
                    backgroundColor: 'rgb(135, 252, 252)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: (data.map(a=>a.age.eightys))
                },
                {
                    label: '80-90',
                    backgroundColor: 'rgb(155, 272, 272)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: (data.map(a=>a.age.nintys))
                },
                {
                    label: '90-120',
                    backgroundColor: 'rgb(175, 292, 292)',
                    borderColor: 'rgb(75, 192, 192)',
                    data: (data.map(a=>a.age.old))
                }
                ]
            };
        }

    
    }
   
    return(
        <>
        {divideData()}
        {bar&&<BarSeg labels={labels}data={data}question={question}/>}
        {pie&&<PieSeg labels={labels}data={data}question={question}/>}
        {line&&<LineSeg labels={labels}data={data}question={question}/>}
        </>
    )
}
export default Data;