import React from 'react';
import { Table, Button } from 'antd';

const VentasPage = () => {
    const columns = [
        { title: 'ID Venta', dataIndex: 'id_venta', key: 'id' },
        { title: 'Fecha Venta', dataIndex: 'fecha_venta', key: 'fecha_venta' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        { title: 'Método de Pago', dataIndex: 'metodo_pago', key: 'metodo_pago' },
    ];

    const data = [
        { id_venta: 1, fecha_venta: '2024-01-01', total: 50, metodo_pago: 'Efectivo' },
        // ... otras ventas
    ];

    return (
        <div>
            <h1>Registro de Ventas</h1>
            <Button type="primary">Agregar Venta</Button>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default VentasPage;
