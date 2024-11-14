import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import LayoutTemplate from '../layout/LayoutTemplate'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LayoutTemplate />} >
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes