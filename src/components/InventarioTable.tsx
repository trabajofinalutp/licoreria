import React, { useEffect, useState } from "react";
import { Table, Input, Layout, Menu, message, Space } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario";

const { Content } = Layout; // Remove Sider since we won't use it
const { Search } = Input;

interface Producto {
    nombre: string;
    categoria: string;
    descripcion: string;
    fecha_registro: string;
    precio: number;
    stock: number;
}

const InventarioTable: React.FC = () => {
    const [allProductos, setAllProductos] = useState<Producto[]>([]);
    const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchField, setSearchField] = useState("nombre");

    const getAuthHeader = () => {
        const user = getUser();
        return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
    };

    const fetchProductos = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/productos", {
                headers: getAuthHeader()
            });
            setAllProductos(data);
            setFilteredProductos(data);
        } catch (error) {
            message.error("Error al cargar los productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleSearch = (value: string) => {
        const filtered = allProductos.filter(producto => {
            const fieldValue = String(producto[searchField as keyof Producto]);
            return fieldValue.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredProductos(filtered);
    };

    const columns = [
        { title: "Nombre", dataIndex: "nombre", key: "nombre" },
        { title: "Categoría", dataIndex: "categoria", key: "categoria" },
        { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
        { 
            title: "Fecha Registro", 
            dataIndex: "fecha_registro", 
            key: "fecha_registro",
            render: (fecha: string) => new Date(fecha).toLocaleString()
        },
        { 
            title: "Precio", 
            dataIndex: "precio", 
            key: "precio",
            render: (precio: number) => `S/${precio.toFixed(2)}`
        },
        { title: "Stock", dataIndex: "stock", key: "stock" },
    ];

    const searchMenuItems = [
        { key: "nombre", label: "Nombre" },
        { key: "categoria", label: "Categoría" },
        { key: "descripcion", label: "Descripción" },
    ];

    return (
        <Content style={{ padding: '24px' }}>
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
                        placeholder={`Buscar por ${searchField}`}
                        allowClear
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: '300px' }}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredProductos}
                    rowKey="id_producto"
                    loading={loading}
                />
            </Space>
        </Content>
    );
};

export default InventarioTable;