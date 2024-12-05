import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Login from './pages/Login'
import Proveedores from './pages/Proveedores'
import Productos from './pages/Productos'
import Inventario from './pages/Inventario'
import ProtectedRoute from './components/ProtectedRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/usuarios" 
          element={
            <ProtectedRoute>
              <Usuarios />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/proveedores" 
          element={
            <ProtectedRoute>
              <Proveedores />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/productos" 
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/inventario" 
          element={
            <ProtectedRoute>
              <Inventario />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  </StrictMode>,
)
