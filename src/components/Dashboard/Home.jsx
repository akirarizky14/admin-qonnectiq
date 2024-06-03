import React, { useEffect, useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userCount,setUserCount] = useState(0);
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          throw new Error('No token found');
        }
        const response = await fetch('http://localhost:5000/v1/api/superadmin/countUser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserCount(data); 
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);
  const settings = {
    width: 150,
    height: 150,
    value: userCount,
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
