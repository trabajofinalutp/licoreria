import React from 'react';
import { Tabs, Table } from 'antd';

const IngresosEgresosPage = () => {
    const ingresosColumns = [
        { title: 'ID', dataIndex: 'id_ingreso', key: 'id' },
        { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
        { title: 'Monto', dataIndex: 'monto', key: 'monto' },
        { title: 'Fecha Ingreso', dataIndex: 'fecha_ingreso', key: 'fecha_ingreso' },
    ];

    const egresosColumns = [
        { title: 'ID', dataIndex: 'id_egreso', key: 'id' },
        { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
        { title: 'Monto', dataIndex: 'monto', key: 'monto' },
        { title: 'Fecha Egreso', dataIndex: 'fecha_egreso', key: 'fecha_egreso' },
    ];

    const ingresosData = [
        { id_ingreso: 1, descripcion: 'Venta de Cerveza', monto: 100, fecha_ingreso: '2024-01-01' },
        // ... otros ingresos
    ];

    const egresosData = [
        { id_egreso: 1, descripcion: 'Compra de Suministros', monto: 50, fecha_egreso: '2024-01-02' },
        // ... otros egresos
    ];

    return (
        <div>
            <h1>Ingresos y Egresos</h1>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Ingresos" key="1">
                    <Table columns={ingresosColumns} dataSource={ingresosData} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Egresos" key="2">
                    <Table columns={egresosColumns} dataSource={egresosData} />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default IngresosEgresosPage;
