import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario";
import moment from "moment";

interface Proveedor {
  idProveedor: number;
  nombre: string;
  correo: string;
  telefono: number;
  direccion: string;
  fechaRegistro: string;
}

const ProveedoresTable: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState<Proveedor | null>(null);
  const [form] = Form.useForm();

  const getAuthHeader = () => {
    const user = getUser();
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const formatDateTime = (dateTime: string) => {
    return moment(dateTime).format('YYYY-MM-DD');
  };

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Proveedor[]>("/api/proveedores", {
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

  const openModal = (proveedor: Proveedor | null = null) => {
    setEditingProveedor(proveedor);
    if (proveedor) {
      form.setFieldsValue({
        ...proveedor,
        telefono: proveedor.telefono.toString()
      });
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
        idProveedor: editingProveedor ? editingProveedor.idProveedor : undefined,
        nombre: values.nombre,
        correo: values.correo,
        telefono: parseInt(values.telefono),
        direccion: values.direccion,
        fechaRegistro: editingProveedor ? editingProveedor.fechaRegistro : undefined,
      };

      if (editingProveedor) {
        await axios.put(`/api/proveedores/${editingProveedor.idProveedor}`, proveedorData, {
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
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
    { title: "Teléfono", dataIndex: "telefono", key: "telefono" },
    { title: "Dirección", dataIndex: "direccion", key: "direccion" },
    { 
      title: "Fecha de Registro", 
      dataIndex: "fechaRegistro", 
      key: "fechaRegistro",
      render: (fechaRegistro: string) => formatDateTime(fechaRegistro)
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (record: Proveedor) => (
        <div>
          <Button onClick={() => openModal(record)} type="link">
            Editar
          </Button>
          <Button onClick={() => handleDelete(record.idProveedor)} type="link" danger>
            Eliminar
          </Button>
        </div>
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
        rowKey="idProveedor"
        loading={loading}
      />
      <Modal
        title={editingProveedor ? "Editar Proveedor" : "Agregar Proveedor"}
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
            name="correo"
            label="Correo"
            rules={[{ required: true, message: "Correo requerido" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Teléfono"
            rules={[{ required: true, message: "Teléfono requerido" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="direccion"
            label="Dirección"
            rules={[{ required: true, message: "Dirección requerida" }]}
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