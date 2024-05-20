import React from 'react'
import Button from '@mui/material/Button';
import '../../css/views/Login/Login.css';
import { TextField } from '@mui/material';
import {FormControl} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Box} from '@mui/material';

import { useState } from 'react';
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className='container-login'>
      <Box className="wrapper-login">
        <div className="title-login">
          <h1 style={{color: "#004A73"}}>Login</h1>
        </div>
        <div
          sx={{ boxShadow: 3 }}
          className='content-login'
        >
            <TextField
              sx={{ m: 2, width: '35ch' }}
              id="outlined-uncontrolled"
              label="Email"
            />
            <FormControl sx={{ m: 2, width: '35ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button style={{backgroundColor: "#004A73"}} variant="contained">Login</Button>
        </div>
      </Box>
    </div>
  )
}

export default Login