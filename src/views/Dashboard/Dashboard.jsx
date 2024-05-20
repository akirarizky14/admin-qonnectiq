import React, { useState } from 'react';
import '../../css/views/Dashboard/Dashboard.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LeftDashboard from '../../components/Dashboard/LeftDashboard';
import Home from '../../components/Dashboard/Home';
import Promotions from '../../components/Dashboard/Promotions';

function Dashboard() {
  // Avatar state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // State to manage the displayed component
  const [selectedComponent, setSelectedComponent] = useState('home');

  const handleItemSelect = (item) => {
    setSelectedComponent(item);
  };

  return (
    <div className="container-dashboard">
      <div className="left-dashboard">
        <div className="wrapper-left-dashboard">
          <div className="avatar-left-dashboard">
            <Avatar
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              alt="Akira Rizky"
              src="/cek"
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <span>Akira Rizky</span>
          </div>
          <div className="menu-left-dashboard">
            <LeftDashboard name="Dashboard" onItemSelect={handleItemSelect} />
          </div>
        </div>
      </div>
      <div className="right-dashboard">
        <div className="wrapper-right-dashboard">
          {selectedComponent === 'home' && <Home />}
          {selectedComponent === 'promotions' && <Promotions />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
