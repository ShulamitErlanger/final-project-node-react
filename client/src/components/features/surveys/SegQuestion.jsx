import React, { useEffect, useState } from "react";
import { CascadeSelect } from 'primereact/cascadeselect';
import { Editor } from "primereact/editor";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import BarSeg from "./BarSeg";
import PieSeg from "./PieSeg";
import LineSeg from "./LineSeg";
import Data from "./Data";
const SegQuestion=(props)=>{
    let {select,setSelect,question,text,setText}=props
    const index=select.indexOf(select.find(s=>s._id==question._id))
    const [selectedCity, setSelectedCity] = useState(select[index].select);
    const [bar, setBar] = useState(false);
    const [pie, setPie] = useState(true);
    const [line, setLine] = useState(false);
    const [feature,setFeature]=useState()
    const [d,setD]=useState(false)
   const labels=question.answers.map(a=>{return a.body})
   const data=question.answers//.map(a=>a.count)
   const indexForText=text.indexOf(text.find(q=>q._id==question._id))
    const countries = [
        {cname: 'תרשים עוגה', code: 'US-AU'},
        {cname: 'היסטוגרמה',code: 'US-DA'},
        {cname: 'גרף', code: 'US-HO'},
    ]
    const features = [
        {fname: 'מגדר',code: 'AU',},
        {fname: 'מגזר',code: 'CA'},
        {fname: 'גיל',code: 'US'}
    ];

    const countryOptionTemplate = (option) => {
        return (<>
            <div className="flex align-items-center gap-2">
                {option.cities && <i className="pi pi-cart-bar"/>}
                {option.cname =='תרשים עוגה'&& <i className="pi pi-chart-pie"/>}
                {option.cname =='היסטוגרמה'&& <i className="pi pi-chart-bar"/>}
                {option.cname =='גרף'&& <i className="pi pi-chart-line"/>}
                <span>{option.cname || option.name}</span>
            </div>
           
            </>
        );
    }

    const featureOptionTemplate = (option) => {
        return (<>
            <div className="flex align-items-center gap-2">
                {option.cities && <i className="pi pi-cart-bar"/>}
                {option.fname =='מגדר'&& <i className="pi pi-user"/>}
                {option.fname =='מגזר'&& <i className="pi pi-tag"/>}
                {option.fname =='גיל'&& <i className="pi pi-sort-numeric-up-alt"/>}
                <span>{option.fname || option.name}</span>
            </div>
           
            </>
        );
    }
   
    const Bar=()=>{
        setBar(true)
        setLine(false)
        setPie(false)
    }
    const Pie=()=>{
        setPie(true)
        setLine(false)
        setBar(false)
    }
    const Line=()=>{
        setLine(true)
        setBar(false)
        setPie(false)
    }
    const segment=(kind)=>{
        kind=='גרף'?Line():
        kind=='היסטוגרמה'?Bar():
        Pie() 
    }
    useEffect(()=>{
        setD(true)
    },[[feature,selectedCity]])

  return(
        <>
        <br/>

        <Card header={<Divider layout='horizontal' />} >
        <div style={{textAlign:"center",fontFamily:'Yehuda CLM'}}>
    <h2>{question.body}</h2>
    </div>
        <div className="card flex justify-content-center">
            <CascadeSelect value={selectedCity} onChange={ e => {select[index].select=e.value.cname;setSelectedCity(e.value);setSelect(select);segment(e.value.cname);}} options={countries} 
                optionLabel="cname" optionGroupLabel="name" optionGroupChildren={['states', 'cities']} 
                className="w-full md:w-14rem" breakpoint="767px" placeholder={selectedCity||"Select a City"} itemTemplate={countryOptionTemplate} style={{ minWidth: '14rem'}} />
        </div>
        <div className="card flex justify-content-center">
            <CascadeSelect value={feature} onChange={(e) => setFeature(e.value.fname)} options={features} 
                optionLabel="fname" optionGroupLabel="name" optionGroupChildren={['states', 'cities']}
                className="w-full md:w-14rem" breakpoint="767px" placeholder="Select a feature" style={{ minWidth: '14rem' }}itemTemplate={featureOptionTemplate}  />
        </div>
         <div className="card">
        <Editor  value={text[indexForText].text} onTextChange={(e) => {text[indexForText].text=e.htmlValue; setText(text);}} style={{ height: '120px' }} />
        </div> </Card>
        {d&&<Data feature={feature} labels={labels}data={data}question={question}bar={bar}pie={pie}line={line}/>}
        </>
    )
}
export default SegQuestion