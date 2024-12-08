import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Switch, message } from "antd";
import axios from "axios";
import { getUser } from "../types/Usuario"; // Importar la función para obtener el usuario
import { useAuth } from "../hooks/useAuth";

const UsuariosTable: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<any>(null);
  const [form] = Form.useForm();
  const [passwordModified, setPasswordModified] = useState(false);
  const loggedInUser = getUser(); // Get the current logged in user
  const { checkAuth } = useAuth();

  const getAuthHeader = () => {
    const user = getUser();
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const { data } = await checkAuth(axios.get("/api/usuarios", {
        headers: getAuthHeader(),
      }));
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
    setPasswordModified(false);
    if (usuario) {
      form.setFieldsValue({
        ...usuario,
        password: '' // Clear password field when editing
      });
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
      await checkAuth(axios.delete(`/api/usuarios/${id}`, {
        headers: getAuthHeader(),
      }));
      message.success("Usuario eliminado con éxito");
      fetchUsuarios();
    } catch (error) {
      message.error("Error al eliminar el usuario");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordModified(e.target.value.length > 0);
  };

  const handleSave = async (values: any) => {
    try {
      const usuarioData = {
        idUsuario: editingUsuario ? editingUsuario.idUsuario : undefined,
        nombre: values.nombre,
        correo: values.correo,
        telefono: values.telefono,
        role: values.role,
        activo: values.activo,
        password: values.password,
        fechaRegistro: editingUsuario ? editingUsuario.fechaRegistro : undefined,
      };

      // Only include password if it's a new user or if it was modified during edit
      if (!editingUsuario || passwordModified) {
        usuarioData.password = values.password;
      }

      if (editingUsuario) {
        await checkAuth(axios.put(`/api/usuarios/${editingUsuario.idUsuario}`, usuarioData, {
          headers: getAuthHeader(),
        }));
        message.success("Usuario actualizado con éxito");
      } else {
        await checkAuth(axios.post("/api/usuarios", usuarioData, {
          headers: getAuthHeader(),
        }));
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
    { title: "Rol", dataIndex: "role", key: "role" },
    { title: "Activo", dataIndex: "activo", key: "activo", render: (activo: boolean) => (activo ? "Sí" : "No") },
    {
      title: "Acciones",
      key: "acciones",
      render: (record: any) => {
        const isCurrentUser = loggedInUser?.email === record.correo;
        
        return (
          <>
            <Button onClick={() => openModal(record)} type="link">
              Editar
            </Button>
            <Button 
              onClick={() => handleDelete(record.idUsuario)} 
              type="link" 
              danger
              disabled={isCurrentUser}
              title={isCurrentUser ? "No puedes eliminar tu propio usuario" : ""}
            >
              Eliminar
            </Button>
          </>
        );
      },
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
            name="role"
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
            name="password"
            label="Contraseña"
            rules={[
              { 
                required: !editingUsuario,
                message: "Contraseña requerida para nuevo usuario" 
              }
            ]}
          >
            <Input.Password onChange={handlePasswordChange} />
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
