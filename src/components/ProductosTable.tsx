import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario";
import moment from "moment";

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    stock: number;
    fecha_registro: string;
}

const ProductosTable: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProducto, setEditingProducto] = useState<Producto | null>(null);
    const [form] = Form.useForm();

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
            const { data } = await axios.get<Producto[]>("/api/productos", {
                headers: getAuthHeader(),
            });
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
            await axios.delete(`/api/productos/${id}`, {
                headers: getAuthHeader(),
            });
            message.success("Producto eliminado con éxito");
            fetchProductos();
        } catch (error) {
            message.error("Error al eliminar el producto");
        }
    };

    const handleSave = async (values: any) => {
        try {
            const productoData = {
                id_producto: editingProducto ? editingProducto.id_producto : undefined,
                nombre: values.nombre,
                descripcion: values.descripcion,
                categoria: values.categoria,
                precio: values.precio,
                stock: values.stock,
                fecha_registro: editingProducto ? editingProducto.fecha_registro : undefined,
            };

            if (editingProducto) {
                await axios.put(`/api/productos/${editingProducto.id_producto}`, productoData, {
                    headers: getAuthHeader(),
                });
                message.success("Producto actualizado con éxito");
            } else {
                await axios.post("/api/productos", productoData, {
                    headers: getAuthHeader(),
                });
                message.success("Producto creado con éxito");
            }
            closeModal();
            fetchProductos();
        } catch (error) {
            message.error("Error al guardar el producto");
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
        { title: "Stock", dataIndex: "stock", key: "stock" },
        { 
            title: "Fecha de Registro", 
            dataIndex: "fecha_registro", 
            key: "fecha_registro",
            render: (fecha_registro: string) => formatDateTime(fecha_registro)
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (record: Producto) => (
                <>
                    <Button onClick={() => openModal(record)} type="link">
                        Editar
                    </Button>
                    <Button onClick={() => handleDelete(record.id_producto)} type="link" danger>
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
                rowKey="id_producto"
                loading={loading}
            />
            <Modal
                title={editingProducto ? "Editar Producto" : "Agregar Producto"}
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
            >
                <Form form={form} onFinish={handleSave} layout="vertical">
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