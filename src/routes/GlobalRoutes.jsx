import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../views/Home/Home'
import Register from '../views/Register/Register'
import Login from '../views/Login/Login'
function GlobalRoutes() {
  return (
    <>
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default GlobalRoutes