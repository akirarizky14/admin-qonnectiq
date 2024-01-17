import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
function Login() {
  return (
    <div>
        <h1>Login</h1>
        <div>
            <input type="text" placeholder='Email' />
            <input type="text" placeholder='Password' />
            <Button variant="contained">Login</Button>
        </div>
        <div>
            <Link to="/register">
                <h1>Sign up</h1>
            </Link>
        </div>
    </div>
  )
}

export default Login