import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id_producto}>{producto.nombre} - ${producto.precio}</li>
                ))}
            </ul>
        </div>
    );
};

export default Productos;