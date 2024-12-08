import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message, Space } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";

interface Producto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    stock: number;
    fechaRegistro: string;
}

const ProductosTable: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
    const [form] = Form.useForm<Producto>();
    const { checkAuth } = useAuth();

    const getAuthHeader = () => {
        const user = getUser();
        return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
    };

    const formatDateTime = (dateTime: string) => {
        return moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
    };

    const fetchProductos = async () => {
        setLoading(true);
        try {
            const { data } = await checkAuth(axios.get<Producto[]>("/api/productos", {
                headers: getAuthHeader(),
            }));
            setProductos(data);
        } catch (error) {
            message.error("Error al cargar los productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const openModal = (producto: Producto | null = null) => {
        setEditingProducto(producto);
        if (producto) {
            form.setFieldsValue(producto);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingProducto(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        try {
            await checkAuth(axios.delete(`/api/productos/${id}`, {
                headers: getAuthHeader(),
            }));
            message.success("Producto eliminado con éxito");
            fetchProductos();
        } catch (error) {
            message.error("Error al eliminar el producto");
        }
    };

    const handleSave = async (values: Producto) => {
        try {
            const productoData: Partial<Producto> = {
                ...values,
                fechaRegistro: editingProducto?.fechaRegistro
            };

            if (editingProducto) {
                await checkAuth(axios.put(`/api/productos/${editingProducto.idProducto}`, productoData, {
                    headers: getAuthHeader(),
                }));
                message.success("Producto actualizado con éxito");
            } else {
                await checkAuth(axios.post("/api/productos", productoData, {
                    headers: getAuthHeader(),
                }));
                message.success("Producto creado con éxito");
            }
            closeModal();
            fetchProductos();
        } catch (error) {
            message.error("Error al guardar el producto");
        }
    };

    const handleStockChange = async (producto: Producto, increment: boolean) => {
        const newStock = producto.stock + (increment ? 1 : -1);
        
        if (newStock < 0) {
            Modal.confirm({
                title: '¿Eliminar producto?',
                content: 'El stock quedará en negativo. ¿Desea eliminar el producto?',
                okText: 'Sí, eliminar',
                cancelText: 'No',
                onOk: () => handleDelete(producto.idProducto)
            });
            return;
        }
    
        try {
            const productoData: Partial<Producto> = {
                ...producto,
                stock: newStock
            };
            
            await checkAuth(axios.put(`/api/productos/${producto.idProducto}`, productoData, {
                headers: getAuthHeader(),
            }));
            message.success("Stock actualizado con éxito");
            fetchProductos();
        } catch (error) {
            message.error("Error al actualizar el stock");
        }
    };

    const columns = [
        { title: "Nombre", dataIndex: "nombre", key: "nombre" },
        { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
        { title: "Categoría", dataIndex: "categoria", key: "categoria" },
        { 
            title: "Precio", 
            dataIndex: "precio", 
            key: "precio",
            render: (precio: number) => `S/${precio.toFixed(2)}`
        },
        { 
            title: "Stock", 
            dataIndex: "stock", 
            key: "stock",
            render: (stock: number, record: Producto) => (
                <Space>
                    <Button 
                        onClick={() => handleStockChange(record, false)}
                        size="small"
                    >
                        -
                    </Button>
                    <span>{stock}</span>
                    <Button 
                        onClick={() => handleStockChange(record, true)}
                        size="small"
                    >
                        +
                    </Button>
                </Space>
            )
        },
        { 
            title: "Fecha de Registro", 
            dataIndex: "fechaRegistro", 
            key: "fechaRegistro",
            render: (fechaRegistro: string) => formatDateTime(fechaRegistro)
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (record: Producto) => (
                <>
                    <Button onClick={() => openModal(record)} type="link">
                        Editar
                    </Button>
                    <Button onClick={() => handleDelete(record.idProducto)} type="link" danger>
                        Eliminar
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
                Agregar Producto
            </Button>
            <Table
                columns={columns}
                dataSource={productos}
                rowKey="idProducto"
                loading={loading}
            />
            <Modal
                title={editingProducto ? "Editar Producto" : "Agregar Producto"}
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
            >
                <Form form={form} onFinish={handleSave} layout="vertical">
                    <Form.Item name="idProducto" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: "Nombre requerido" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripción"
                        rules={[{ required: true, message: "Descripción requerida" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="categoria"
                        label="Categoría"
                        rules={[{ required: true, message: "Categoría requerida" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="precio"
                        label="Precio"
                        rules={[{ required: true, message: "Precio requerido" }]}
                    >
                        <InputNumber
                            min={0}
                            step={0.01}
                            prefix="S/"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: "Stock requerido" }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProductosTable;