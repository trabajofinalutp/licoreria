import React from 'react';
import { Table, Button } from 'antd';

const ProveedoresPage = () => {
    const columns = [
        { title: 'ID', dataIndex: 'id_proveedor', key: 'id' },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Correo', dataIndex: 'correo', key: 'correo' },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono' },
        { title: 'Dirección', dataIndex: 'direccion', key: 'direccion' },
        { title: 'Fecha Registro', dataIndex: 'fecha_registro', key: 'fecha_registro' },
    ];

    const data = [
        { id_proveedor: 1, nombre: 'Proveedor A', correo: 'a@proveedor.com', telefono: '123456789', direccion: 'Calle 123', fecha_registro: '2024-01-01' },
        // ... otros proveedores
    ];

    return (
        <div>
            <h1>Registro de Proveedores</h1>
            <Button type="primary">Agregar Proveedor</Button>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default ProveedoresPage;
