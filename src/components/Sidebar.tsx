import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  AppstoreOutlined,
  TeamOutlined, 
  UserOutlined, 
  LogoutOutlined,
  ShoppingOutlined, 
  ShoppingCartOutlined, 
  FileTextOutlined 
} from '@ant-design/icons';
import { clearUser, getUser } from "../types/Usuario";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/inventario",
      icon: <AppstoreOutlined />,
      label: <Link to="/inventario">Inventario</Link>,
    },
    {
      key: "/proveedores",
      icon: <TeamOutlined />,
      label: <Link to="/proveedores">Proveedores</Link>,
    },
    ...(getUser()?.role === 'ROLE_ADMIN' ? [{
      key: "/usuarios",
      icon: <UserOutlined />,
      label: <Link to="/usuarios">Usuarios</Link>,
    }] : []),
    {
      key: "/productos",
      icon: <ShoppingOutlined />,
      label: <Link to="/productos">Productos</Link>, 
    },
    {
      key: "/ventas",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/ventas">Ventas</Link>,
    },
    {
      key: "/detalleventa",
      icon: <FileTextOutlined />, 
      label: <Link to="/detalleventa">Detalle Ventas</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Cerrar Sesión",
      onClick: handleLogout
    }
  ];

  const handleMenuClick = (item: any) => {
    if (item.key === "logout") {
      handleLogout();
    } else {
      navigate(item.key);
    }
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div style={{
        height: collapsed ? '60px' : '180px', // Reduced height
        marginTop: '16px', // Keep top margin
        marginLeft: '16px',
        marginRight: '16px',
        marginBottom: '8px', // Reduced bottom margin
        background: 'rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to top
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s',
        paddingTop: '16px' // Add top padding for content
      }}>
        <img 
          src="https://i.gifer.com/SU1.gif" 
          alt="Logo"
          style={{
            width: collapsed ? '40px' : '100px',
            height: collapsed ? '40px' : '100px',
            objectFit: 'contain',
            transition: 'all 0.3s'
          }}
        />
        <span style={{
          color: '#fff',
          marginTop: '8px',
          fontSize: collapsed ? '12px' : '16px',
          opacity: collapsed ? 0 : 1,
          transition: 'all 0.3s'
        }}>
          El buen beber
        </span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPath]}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
