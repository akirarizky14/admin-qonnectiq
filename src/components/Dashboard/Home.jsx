import React from 'react'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

function Home() {
    const settings = {
        width: 200,
        height: 200,
        value: 60,
      };
  return (
    <div className="container-home-dashboard">
        <div className="wrapper-home-dashboard">
        <Gauge
            {...settings}
            cornerRadius="50%"
            sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                color: "white",
                },
                [`& .${gaugeClasses.valueArc}`]: {
                fill: '#52b202',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                fill: "white",
                },
            })}
        />
        </div>
    </div>
  )
}

export default Home