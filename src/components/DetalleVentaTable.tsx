import React, { useEffect, useState } from "react";
import { Table, message, Input, Menu, Space } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario";
import { useAuth } from "../hooks/useAuth"; // Add this import

const { Search } = Input;

interface Venta {
    idVenta: number;
    fechaVenta: string;
    total: number;
    metodoPago: string;
}

interface Producto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    fechaRegistro: string | null;
}

interface DetalleVenta {
    idDetalle: number;
    venta: Venta;
    producto: Producto;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

const DetalleVentaTable: React.FC = () => {
    const { checkAuth } = useAuth(); // Add this line
    const [allDetalleVentas, setAllDetalleVentas] = useState<DetalleVenta[]>([]);
    const [detalleVentas, setDetalleVentas] = useState<DetalleVenta[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchField, setSearchField] = useState("producto.nombre");

    const getAuthHeader = () => {
        const user = getUser();
        return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
    };

    const fetchDetalleVentas = async () => {
        setLoading(true);
        try {
            const response = await checkAuth(axios.get<DetalleVenta[]>( // Wrap with checkAuth
                "http://localhost:8083/api/detalleventas",
                {
                    headers: getAuthHeader(),
                }
            ));

            const validatedData = (response.data || []).map((item: DetalleVenta) => ({
                idDetalle: item.idDetalle || 0,
                venta: item.venta || {
                    idVenta: 0,
                    fechaVenta: '',
                    total: 0,
                },
                producto: item.producto || {
                    idProducto: 0,
                    nombre: 'N/A',
                    descripcion: '',
                    precio: 0,
                    stock: 0,
                    categoria: '',
                    fechaRegistro: null
                },
                cantidad: Number(item.cantidad) || 0,
                precioUnitario: Number(item.precioUnitario) || 0,
                subtotal: Number(item.subtotal) || 0
            }));

            setAllDetalleVentas(validatedData);
            setDetalleVentas(validatedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            message.error("Error al cargar los detalles de venta");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetalleVentas();
    }, []);

    const handleSearch = (value: string) => {
        const filtered = allDetalleVentas.filter(detalle => {
            let fieldValue = '';
            
            // Handle nested objects
            if (searchField === "producto.nombre") {
                fieldValue = String(detalle.producto.nombre);
            } else if (searchField === "venta.metodoPago") {
                fieldValue = String(detalle.venta.metodoPago);
            } else {
                fieldValue = String(detalle[searchField as keyof DetalleVenta]);
            }
            
            return fieldValue.toLowerCase().includes(value.toLowerCase());
        });
        setDetalleVentas(filtered);
    };

    const formatPrice = (value: number | null | undefined) => {
        if (value === null || value === undefined || isNaN(value)) return 'S/0.00';
        return `S/${Number(value).toFixed(2)}`;
    };

    const searchMenuItems = [
        { key: "producto.nombre", label: "Nombre Producto" },
        { key: "cantidad", label: "Cantidad" },
    ];

    const columns = [
        { 
            title: "ID Detalle", 
            dataIndex: "idDetalle", 
            key: "idDetalle",
            render: (id: number) => id || 'N/A'
        },
        { 
            title: "Producto", 
            dataIndex: ["producto", "nombre"], 
            key: "producto",
            render: (text: string) => text || 'N/A'
        },
        { 
            title: "Cantidad", 
            dataIndex: "cantidad", 
            key: "cantidad",
            render: (cantidad: number) => cantidad || 0
        },
        { 
            title: "Precio Unitario", 
            dataIndex: "precioUnitario", 
            key: "precioUnitario",
            render: (precio: number) => formatPrice(precio)
        },
        { 
            title: "Subtotal", 
            dataIndex: "subtotal", 
            key: "subtotal",
            render: (subtotal: number) => formatPrice(subtotal)
        },
        { 
            title: "ID Venta", 
            dataIndex: ["venta", "idVenta"], 
            key: "idVenta",
            render: (id: number) => id || 'N/A'
        }
    ];

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <Menu
                    mode="horizontal"
                    selectedKeys={[searchField]}
                    onClick={({key}) => setSearchField(key)}
                    items={searchMenuItems}
                    style={{ flex: '0 0 auto' }}
                />
                <Search
                    placeholder={`Buscar por ${searchField.split('.').pop()}`}
                    allowClear
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: '300px' }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={detalleVentas}
                rowKey={record => String(record?.idDetalle)}
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </Space>
    );
};

export default DetalleVentaTable;