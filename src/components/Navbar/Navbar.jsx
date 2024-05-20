import React from 'react'
import '../../css/components/Navbar/Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="container-navbar">
      <div className="wrapper-navbar">
        <h1>Rubriks</h1>
        <div className="list-navbar">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar