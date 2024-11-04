import React from 'react';
import { Table } from 'antd';

const MainPage = () => {
    const columns = [
        { title: 'ID', dataIndex: 'id_producto', key: 'id' },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
        { title: 'Precio', dataIndex: 'precio', key: 'precio' },
        { title: 'Stock', dataIndex: 'stock', key: 'stock' },
        { title: 'Categoría', dataIndex: 'categoria', key: 'categoria' },
        { title: 'Fecha Registro', dataIndex: 'fecha_registro', key: 'fecha_registro' },
    ];

    // Simular datos de productos
    const data = [
        { id_producto: 1, nombre: 'Cerveza', descripcion: 'Cerveza rubia', precio: 3.5, stock: 50, categoria: 'Bebidas', fecha_registro: '2024-01-01' },
        // ... otros productos
    ];

    return (
        <div>
            <h1>Lista de Productos</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default MainPage;
