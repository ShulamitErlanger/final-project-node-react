import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
const LineSeg=(props)=> {
   var {labels,data,question}=props
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [colorsGroup,setColorsGroup]=useState(['rgb(20, 220, 185)',
    'rgb(20, 200, 200)',
    'rgb(20, 150, 255)',
    'rgb(20, 220, 185)',
    'rgb(20, 200, 200)',
    'rgb(20, 150, 255)',
    'rgb(20, 160, 240)'

    ])
    const [borderColors,setBorderColors]=useState(['rgb(100, 255, 255)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(75, 192, 192)',
    'rgb(75, 180, 180)'
    ])


    const [borderWidthh,setBorderWidthh]=useState('1')


    useEffect(() => {
        const data2 = {
            labels: labels,
            datasets: [
                {
                    label: question.body,
                    data: data,
                    backgroundColor: colorsGroup,
                    borderColor:borderColors,
                    borderWidth: borderWidthh
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data2);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
       <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
export default LineSeg
        
        