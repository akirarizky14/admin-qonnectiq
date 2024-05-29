import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const settings = {
    width: 150,
    height: 150,
    value: 60,
  };
  const handleUsers = () =>{
    navigate('/')
  }
  return (
    <div className="container-home-dashboard">
      <div className="wrapper-home-dashboard">
        <div onClick={handleUsers} className="user-home-dashboard">
            <Gauge
              {...settings}
              cornerRadius="50%"
              sx={() => ({
                  [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 60,
                  fontWeight: 700,
                  color: "#ffffff"
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                  fill: '#52b202',
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                  fill: 'white',
                  },
              })}
            />
            <span>Total Users</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
