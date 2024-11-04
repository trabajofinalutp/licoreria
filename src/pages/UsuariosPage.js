import React from 'react';
import { Table, Button } from 'antd';

const UsuariosPage = () => {
    const columns = [
        { title: 'ID', dataIndex: 'id_usuario', key: 'id' },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
        { title: 'Correo', dataIndex: 'correo', key: 'correo' },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono' },
        { title: 'Rol', dataIndex: 'rol', key: 'rol' },
        { title: 'Fecha Registro', dataIndex: 'fecha_registro', key: 'fecha_registro' },
    ];

    const data = [
        { id_usuario: 1, nombre: 'Admin', correo: 'admin@licoreria.com', telefono: '987654321', rol: 'admin', fecha_registro: '2024-01-01' },
        // ... otros usuarios
    ];

    return (
        <div>
            <h1>Registro de Usuarios</h1>
            <Button type="primary">Agregar Usuario</Button>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default UsuariosPage;
