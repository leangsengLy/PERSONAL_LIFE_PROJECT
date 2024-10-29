import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../Global/View/Login/Login'
import Blog from '../Component/Blog'
import Content from '../Component/Content'
import Test from '../Component/Test'
function LZRoutes() {
  return (
    <>
        <Routes>
            <Route path='login' Component={Login}/>
            <Route path='/' Component={Test}/>
              <Route path='/blog' Component={Blog}/>
              <Route path='/content' Component={Content}/>
        </Routes>
    </>
  )
}

export default LZRoutes