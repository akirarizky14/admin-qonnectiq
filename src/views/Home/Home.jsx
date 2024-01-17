import React from 'react'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <div>
      <h1>Qonnectiq</h1>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Home