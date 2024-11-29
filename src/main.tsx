import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Login from './pages/Login'
import Proveedores from './pages/Proveedores';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </Router>
  </StrictMode>,
)
