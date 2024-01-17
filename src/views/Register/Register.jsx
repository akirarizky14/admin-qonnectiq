import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
function Register() {
  return (
    <div>
        <h1>Register</h1>
        <div>
            <input type="text" placeholder='Full Name' />
            <input type="text" placeholder='Nick Name' />
            <input type="text" placeholder='Email' />
            <input type="text" placeholder='Password' />
            <Button variant="contained">Register</Button>
        </div>
        <div>
            <Link to="/login">
                <h1>Sign in</h1>
            </Link>
        </div>
    </div>
  )
}

export default Register