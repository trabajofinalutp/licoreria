import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { HomeOutlined, AppstoreOutlined, LoginOutlined, TeamOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
      key: "/login",
      icon: <LoginOutlined />,
      label: <Link to="/login">Login</Link>,
    },
    {
      key: "/proveedores",
      icon: <TeamOutlined />,
      label: <Link to="/proveedores">Proveedores</Link>,
    },
    {
      key: "/usuarios",
      icon: <UserOutlined />,
      label: <Link to="/usuarios">Usuarios</Link>,
    },
  ];

  const handleMenuClick = (item: any) => {
    navigate(item.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
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
      <Button type="primary" onClick={toggleCollapsed} style={{ margin: '16px' }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  );
};

export default Sidebar;
