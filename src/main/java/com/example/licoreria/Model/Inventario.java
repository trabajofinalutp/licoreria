package com.example.licoreria.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idInventario;

    @ManyToOne
    @JoinColumn(name = "idProducto")
    private Producto producto;

    private int cantidad;
    private Date fechaActualizacion;

    public int getIdInventario() { return idInventario; }
    public void setIdInventario(int idInventario) { this.idInventario = idInventario; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public Date getFechaActualizacion() { return fechaActualizacion; }
    public void setFechaActualizacion(Date fechaActualizacion) { this.fechaActualizacion = fechaActualizacion; }
}