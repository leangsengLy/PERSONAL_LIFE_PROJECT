import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../Global/View/Login/Login'
import PageNotFound from '../Component/PageNotFound'
import HomeMenu from '../Component/HomeMenu.jsx'
import WebSectionContent from '../Component/WebSectionContent.jsx'
import SubMenuContent from '../Component/SubMenuContent/SubMenuContent.jsx'
function LZRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' Component={HomeMenu}/>
            <Route path='/login' Component={Login}/>
            <Route path='/logout' Component={Login}/>
            <Route path='/web/:type' Component={WebSectionContent}>
              <Route path=':subType' Component={SubMenuContent}/>
            </Route>
            <Route path='*' Component={PageNotFound}/>
        </Routes>
    </>
  )
}

export default LZRoutes