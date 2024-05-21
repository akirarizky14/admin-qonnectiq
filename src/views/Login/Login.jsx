import React, { useState } from 'react';
import { Button, TextField, FormControl, IconButton, OutlinedInput, InputLabel, InputAdornment, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLogin } from '../../hooks/useLogin';
import '../../css/views/Login/Login.css';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard')
  };

  return (
    <div className='container-login'>
      <Box className="wrapper-login">
        <div className="title-login">
          <h1 style={{ color: "#004A73" }}>Login</h1>
        </div>
        <form
          sx={{ boxShadow: 3 }}
          className='content-login'
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ m: 2, width: '35ch' }}
            id="outlined-uncontrolled"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete='email'
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete='current-password'
            />
          </FormControl>
          <Button
            style={{ backgroundColor: "#004A73" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            Login
          </Button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </Box>
    </div>
  );
}

export default Login;
