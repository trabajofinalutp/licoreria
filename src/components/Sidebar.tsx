import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  AppstoreOutlined,
  TeamOutlined, 
  UserOutlined, 
  LogoutOutlined,
  ShoppingOutlined, // Import the icon for productos
  ShoppingCartOutlined, // Add this import for ventas
  FileTextOutlined // Import this icon from antd
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
