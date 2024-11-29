import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import { getUser } from '../types/Usuario';

const { Content, Footer } = Layout;

const Home = () => {
  const user = getUser();

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Barra lateral (Sider) con el nuevo componente Sidebar */}
      <Sidebar />

      {/* Contenido principal del layout */}
      <Layout style={{ padding: '24px' }}>
        <Content
          style={{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: 280,
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2>Bienvenido a la Gestión de Bodega</h2>
          <p>Selecciona una opción en el menú para comenzar.</p>
          <img src="https://i.gifer.com/SU1.gif" alt="Bienvenido" />
        </Content>

        {/* Pie de página */}
        <Footer style={{ textAlign: 'center' }}>© 2024 Gestión de Bodega</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;