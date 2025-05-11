import React, { useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../Global/View/Login/Login'
import PageNotFound from '../Component/PageNotFound'
import HomeMenu from '../Component/HomeMenu.jsx'
import WebSectionContent from '../Component/WebSectionContent.jsx'
import SubMenuContent from '../Component/SubMenuContent/SubMenuContent.jsx'
import Province from '../Page/Setting/Country/Province.jsx'
import ProfileIndex from '../Page/Profile/ProfileIndex.jsx'
import {changeTheme} from '../Store/ThemeBackground/Theme.js'
import { useDispatch } from 'react-redux'
function LZRoutes() {
   const dispatch = useDispatch()
  useEffect(()=>{
    var isDark = localStorage.getItem("isDark");
    dispatch(changeTheme(isDark=="true"))
  })
  return (
    <>
        <Routes>
            <Route path='/' Component={HomeMenu}/>
            <Route path='/login' Component={Login}/>
            <Route path='/logout' Component={Login}/>
            <Route path='/profile' Component={ProfileIndex}/>
            <Route path='/web/:type' Component={WebSectionContent}>
              <Route path=':subType' Component={SubMenuContent}>
                {/* // Route below we just setup for check in component "SubMenuContent" by param to know about we click to the child and then we render the same place  */}
                  <Route path=':subChild' Component={Province}/> 
              </Route>
            </Route>
            <Route path='*' Component={PageNotFound}/>
        </Routes>
    </>
  )
}

export default LZRoutes