package com.example.borraicho.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idInventario;

    @ManyToOne
    @JoinColumn(name = "idProducto")
    private Producto producto;

    private LocalDate fechaIngreso; // Se puede usar LocalDate
    private int cantidad;

    public int getIdInventario(){ return idInventario;}
    public void setIdInventario(int idInventario){ this.idInventario = idInventario;}

    public Producto getProducto(){ return producto;}
    public void setProducto(Producto producto){ this.producto = producto;}

    public LocalDate getFechaIngreso(){ return fechaIngreso;}
    public void setFechaIngreso(LocalDate fechaIngreso){ this.fechaIngreso = fechaIngreso;}

    public int getCantidad(){ return cantidad;}
    public void setCantidad(int cantidad){ this.cantidad = cantidad;}
}
