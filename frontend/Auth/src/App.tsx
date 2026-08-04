import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  
  
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" element={<LandingPage />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App