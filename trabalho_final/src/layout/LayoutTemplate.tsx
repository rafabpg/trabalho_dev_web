import Header from '../components/Molecules/Header'
import { Outlet } from 'react-router-dom'

const LayoutTemplate = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutTemplate