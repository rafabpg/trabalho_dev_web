
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import LayoutTemplate from '../layout/LayoutTemplate'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<LayoutTemplate />} >
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes