import { useState } from 'react'
import Login from './pages/Login/Login'
import { BrowserRouter, Route ,Routes} from 'react-router-dom'
import './App.css'
import Register from './pages/Registration/Registration'
import DashboardLayoutBasic from './pages/Dashboard/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayoutBasic/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
