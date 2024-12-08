import React from "react";
import { Layout } from "antd";
import DetalleVentaTable from "../components/DetalleVentaTable";
import Sidebar from "../components/Sidebar";

const { Header, Content, Footer } = Layout;

const DetalleVenta: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", color: "#fff", textAlign: "center", fontSize: "24px" }}>
        Gestión de Ventas
      </Header>
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              background: "#fff",
              padding: "24px",
              margin: 0,
              minHeight: 280,
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <DetalleVentaTable />
          </Content>
          <Footer style={{ textAlign: "center" }}>© 2024 Gestión de Bodega</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DetalleVenta;