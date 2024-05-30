import React, { useRef, useState } from 'react';
import BarSeg from '../surveys/BarSeg';
import PieSeg from '../surveys/PieSeg';
import LineSeg from '../surveys/LineSeg';
import { Editor } from 'primereact/editor';
const SegQuestion=(props)=> {
    const {refetch,question,survey}=props
    const [bar, setBar] = useState(question.segmentation.kind=='היסטוגרמה');
    const [pie, setPie] = useState(question.segmentation.kind=='תרשים עוגה');
    const [line, setLine] = useState(question.segmentation.kind=='גרף');
    const labels=question.answers.map(a=>{return a.body})
   const data=question.answers//.map(a=>a.count)
  
    return (
        <div className="card">
              <div className="card flex justify-content-center" style={{textAlign:'center',fontFamily:'Yehuda CLM'}}>
            <h2>{question.body} </h2>
        </div>
             
        <p className="m-0" style={{textAlign:'center'}}>
            {bar&&<BarSeg labels={labels}data={data}question={question}/>}
            {pie&&<PieSeg labels={labels}data={data}question={question}/>}
            {line&&<LineSeg labels={labels}data={data}question={question}/>}
        </p> 
        <p className="m-0">
            {question.segmentation.note&&
        <div
    dangerouslySetInnerHTML={{
        __html:question.segmentation.note 
        }}></div>}  
        </p>      
        </div>
    )       
}
export default SegQuestion


