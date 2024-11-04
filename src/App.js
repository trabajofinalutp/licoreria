// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Productos from './components/Productos';
import Proveedores from './components/Proveedores';
import Ventas from './components/Ventas';
import Usuarios from './components/Usuarios';
import IngresosEgresos from './components/IngresosEgresos';

const App = () => {
    return (
        <div>
            <h1>Bienvenido a El Buen Beber</h1>
            <Routes>
                <Route path="/productos" element={<Productos />} />
                <Route path="/proveedores" element={<Proveedores />} />
                <Route path="/ventas" element={<Ventas />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/ingresos-egresos" element={<IngresosEgresos />} />
            </Routes>
        </div>
    );
};

export default App;
