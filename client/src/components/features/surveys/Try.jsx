
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

const Try=(props)=> {
    const{labels,data}=props
const data2={
     labels: labels,
    datasets: [
        {
            data: data,
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)'
              ],
              borderWidth: 1
        }
    ]
};
const options={
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
    return (
        <div className="card">
            <Chart type="bar" data={data2} options={options} />
        </div>
    )
}
export default Try