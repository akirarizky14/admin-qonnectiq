import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from '../views/Login/Login'
import '../css/routes/GlobalRoutes.css'
import Dashboard from '../views/Dashboard/Dashboard'

function GlobalRoutes() {
  return (
    <>
        <BrowserRouter>
          <div className="BrowserRouter">
            <Routes className="Routes">
                <Route path='/' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
          </div>
        </BrowserRouter>
    </>
  )
}

export default GlobalRoutes