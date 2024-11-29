import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Switch, message } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario"; // Importar la función para obtener el usuario

const UsuariosTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<any>(null);
  const [form] = Form.useForm();

  // Obtén el token JWT del usuario
  const getAuthHeader = () => {
    const user = getUser();
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/usuarios", {
        headers: getAuthHeader(),
      });
      setUsuarios(data);
    } catch (error) {
      message.error("Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const openModal = (usuario: any = null) => {
    setEditingUsuario(usuario);
    if (usuario) {
      form.setFieldsValue(usuario);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingUsuario(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/usuarios/${id}`, {
        headers: getAuthHeader(),
      });
      message.success("Usuario eliminado con éxito");
      fetchUsuarios();
    } catch (error) {
      message.error("Error al eliminar el usuario");
    }
  };

  const handleSave = async (values: any) => {
    try {
      const usuarioData = {
        idUsuario: editingUsuario ? editingUsuario.idUsuario : undefined,
        nombre: values.nombre,
        correo: values.correo,
        telefono: values.telefono,
        rol: values.rol,
        activo: values.activo,
        fechaRegistro: editingUsuario ? editingUsuario.fechaRegistro : undefined,
        contraseña: values.contraseña,
      };

      if (editingUsuario) {
        await axios.put(`/api/usuarios/${editingUsuario.idUsuario}`, usuarioData, {
          headers: getAuthHeader(),
        });
        message.success("Usuario actualizado con éxito");
      } else {
        await axios.post("/api/usuarios", usuarioData, {
          headers: getAuthHeader(),
        });
        message.success("Usuario creado con éxito");
      }
      closeModal();
      fetchUsuarios();
    } catch (error) {
      message.error("Error al guardar el usuario");
    }
  };

  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Correo", dataIndex: "correo", key: "correo" },
    { title: "Teléfono", dataIndex: "telefono", key: "telefono" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    { title: "Activo", dataIndex: "activo", key: "activo", render: (activo: boolean) => (activo ? "Sí" : "No") },
    {
      title: "Acciones",
      key: "acciones",
      render: (record: any) => (
        <>
          <Button onClick={() => openModal(record)} type="link">
            Editar
          </Button>
          <Button onClick={() => handleDelete(record.idUsuario)} type="link" danger>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
        Agregar Usuario
      </Button>
      <Table
        columns={columns}
        dataSource={usuarios}
        rowKey="idUsuario"
        loading={loading}
      />
      <Modal
        title={editingUsuario ? "Editar Usuario" : "Agregar Usuario"}
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
          <Form.Item name="telefono" label="Teléfono">
            <Input />
          </Form.Item>
          <Form.Item
            name="rol"
            label="Rol"
            rules={[{ required: true, message: "Rol requerido" }]}
          >
            <Select>
              <Select.Option value="ADMIN">Admin</Select.Option>
              <Select.Option value="USER">Usuario</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="activo"
            label="Activo"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="contraseña"
            label="Contraseña"
            rules={[{ required: true, message: "Contraseña requerida" }]}
          >
            <Input.Password />
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

export default UsuariosTable;
