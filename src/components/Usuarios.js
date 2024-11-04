import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Card, Divider } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';

const { Option } = Select;

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null); // Para almacenar el usuario que se está editando

  // Cargar usuarios al iniciar
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/usuarios');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        message.error(error.message);
      }
    };
    fetchUsuarios();
  }, []);

  const showModal = (user = null) => {
    setEditingUser(user);
    setIsModalVisible(true);
    if (user) {
        form.setFieldsValue({
            nombre: user.nombre,
            correo: user.correo,
            telefono: user.telefono,
            rol: user.rol,
            activo: user.activo // Asegúrate de incluir el estado 'activo'
        });
    } else {
        form.resetFields();
    }
};




const handleOk = async () => {
    try {
        const values = await form.validateFields();
        let response;

        if (editingUser) {
            // Actualiza el usuario
            response = await fetch(`http://localhost:5000/api/usuarios/${editingUser.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const newUser = await response.json();
                // Actualiza el estado de usuarios directamente
                setUsuarios(prevUsuarios => 
                    prevUsuarios.map(user => (user.id_usuario === newUser.id_usuario ? newUser : user))
                );
                message.success('Usuario actualizado exitosamente');
            } else {
                message.error('Error al actualizar usuario');
            }
        } else {
            // Agrega un nuevo usuario
            response = await fetch('http://localhost:5000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const newUser = await response.json();
                setUsuarios(prevUsuarios => [...prevUsuarios, newUser]);
                message.success('Usuario agregado exitosamente');
            } else {
                message.error('Error al agregar usuario');
            }
        }
        form.resetFields();
        setIsModalVisible(false);
    } catch (errorInfo) {
        console.log('Error en la validación:', errorInfo);
    }
};

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      setUsuarios(usuarios.filter(user => user.id_usuario !== id));
      message.success('Usuario eliminado exitosamente');
    } else {
      message.error('Error al eliminar usuario');
    }
  };

  const handleToggleActive = async (user) => {
    const updatedUser = {
        ...user,
        activo: user.activo === 1 ? 0 : 1, // Cambiar el estado de activo
    };

    const response = await fetch(`http://localhost:5000/api/usuarios/${user.id_usuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
        const newUser = await response.json();
        // Actualiza el estado de usuarios para reflejar el cambio
        setUsuarios(prevUsuarios => 
            prevUsuarios.map(u => (u.id_usuario === newUser.id_usuario ? newUser : u))
        );
        message.success('Estado de usuario actualizado exitosamente');
    } else {
        message.error('Error al actualizar estado de usuario');
    }
};



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id_usuario',
      key: 'id_usuario',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
    },
    {
      title: 'Estado',
      dataIndex: 'activo',
      key: 'activo',
      render: (text, record) => (
        <span>
            {text ? 'Activo' : 'Desactivado'}
            <Button 
                type="link" 
                icon={text ? <StopOutlined /> : <CheckOutlined />} 
                onClick={() => handleToggleActive(record)} // Pasa el objeto completo
            />
        </span>
    ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <span>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="link" 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id_usuario)} 
          />
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Gestión de Usuarios" style={{ marginBottom: '20px' }}>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => showModal()}>
          Agregar Usuario
        </Button>
      </Card>
      <Divider />
      <Table 
        columns={columns} 
        dataSource={usuarios} 
        rowKey="id_usuario" 
        pagination={{ pageSize: 10 }} 
        style={{ backgroundColor: '#f9f9f9' }} 
      />

      <Modal title={editingUser ? "Editar Usuario" : "Agregar Usuario"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre' },
              {
                validator: (_, value) => {
                  if (!value || (value.trim().length >= 12 && value.trim().length <= 80)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('El nombre debe tener entre 12 y 80 caracteres (sin contar espacios)'));
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="correo"
            label="Correo"
            rules={[
              { required: true, message: 'Por favor ingrese el correo' },
              {
                type: 'email',
                message: 'El correo ingresado no es válido',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Teléfono"
            rules={[
              { required: true, message: 'Por favor ingrese el teléfono' },
              {
                validator: (_, value) => {
                  const regex = /^9\d{8}$/;
                  if (!value || regex.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('El teléfono debe tener 9 dígitos y comenzar con 9'));
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rol"
            label="Rol"
            rules={[{ required: true, message: 'Por favor seleccione un rol' }]}
          >
            <Select placeholder="Selecciona un rol">
              <Option value="admin">Administrador</Option>
              <Option value="user">Usuario</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Usuarios;
