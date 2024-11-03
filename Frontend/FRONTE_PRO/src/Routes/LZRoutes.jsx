import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../Global/View/Login/Login'
import Content from '../Component/Content'
import PageNotFound from '../Component/PageNotFound'
import HomeMenu from '../Component/HomeMenu.jsx'
function LZRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' Component={HomeMenu}/>
            <Route path='/login' Component={Login}/>
            <Route path='/logout' Component={Login}/>
            <Route path='/content' Component={Content}/>
            <Route path='*' Component={PageNotFound}/>
        </Routes>
    </>
  )
}

export default LZRoutes