import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario";

const ProveedoresTable: React.FC = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState<any>(null);
  const [form] = Form.useForm();

  const getAuthHeader = () => {
    const user = getUser();
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/proveedores", {
        headers: getAuthHeader(),
      });
      setProveedores(data);
    } catch (error) {
      message.error("Error al cargar los proveedores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const openModal = (proveedor: any = null) => {
    setEditingProveedor(proveedor);
    if (proveedor) {
      form.setFieldsValue(proveedor);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProveedor(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/proveedores/${id}`, {
        headers: getAuthHeader(),
      });
      message.success("Proveedor eliminado con éxito");
      fetchProveedores();
    } catch (error) {
      message.error("Error al eliminar el proveedor");
    }
  };

  const handleSave = async (values: any) => {
    try {
      const proveedorData = {
        id_proveedor: editingProveedor ? editingProveedor.id_proveedor : undefined,
        nombre: values.nombre,
        direccion: values.direccion,
        telefono: values.telefono,
        correo: values.correo,
        fecha_registro: editingProveedor ? editingProveedor.fecha_registro : undefined,
      };

      if (editingProveedor) {
        await axios.put(`/api/proveedores/${editingProveedor.id_proveedor}`, proveedorData, {
          headers: getAuthHeader(),
        });
        message.success("Proveedor actualizado con éxito");
      } else {
        await axios.post("/api/proveedores", proveedorData, {
          headers: getAuthHeader(),
        });
        message.success("Proveedor creado con éxito");
      }
      closeModal();
      fetchProveedores();
    } catch (error) {
      message.error("Error al guardar el proveedor");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id_proveedor", key: "id_proveedor" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
    { title: "Dirección", dataIndex: "direccion", key: "direccion" },
    { title: "Teléfono", dataIndex: "telefono", key: "telefono" },
    { title: "Fecha de Registro", dataIndex: "fecha_registro", key: "fecha_registro" },
    {
      title: "Acciones",
      key: "acciones",
      render: (record: any) => (
        <>
          <Button onClick={() => openModal(record)} type="link">
            Editar
          </Button>
          <Button onClick={() => handleDelete(record.id_proveedor)} type="link" danger>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Agregar Proveedor
      </Button>
      <Table
        columns={columns}
        dataSource={proveedores}
        rowKey="id_proveedor"
        loading={loading}
      />
      <Modal
        title={editingProveedor ? "Editar Proveedor" : "Agregar Proveedor"}
        visible={isModalOpen}
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
            name="correo"
            label="Correo"
            rules={[{ required: true, message: "Correo requerido" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="direccion"
            label="Dirección"
            rules={[{ required: true, message: "Dirección requerida" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Teléfono"
            rules={[{ required: true, message: "Teléfono requerido" }]}
          >
            <Input />
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

export default ProveedoresTable;