import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="main">
                <Link to="/">Productos</Link>
            </Menu.Item>
            <Menu.Item key="proveedores">
                <Link to="/proveedores">Proveedores</Link>
            </Menu.Item>
            <Menu.Item key="ventas">
                <Link to="/ventas">Ventas</Link>
            </Menu.Item>
            <Menu.Item key="usuarios">
                <Link to="/usuarios">Usuarios</Link>
            </Menu.Item>
            <Menu.Item key="ingresos-egresos">
                <Link to="/ingresos-egresos">Ingresos y Egresos</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;
