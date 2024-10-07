package com.example.borraicho.model;

import jakarta.persistence.*;

@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProducto;

    private String nombreProducto;
    private String descripcion;
    private double precio;
    private String categoria;
    private int stock;

    @ManyToOne
    @JoinColumn(name = "idProveedor")
    private Proveedor Proveedor;

    public int getIdProducto(){ return idProducto;}
    public void setIdProducto(int idProducto){ this.idProducto = idProducto;}

    public String getNombreProducto(){ return nombreProducto;}
    public void setNombreProducto(String nombreProducto){ this.nombreProducto = nombreProducto;}

    public String getDescripcion(){ return descripcion;}
    public void setDescripcion(String descripcion){ this.descripcion = descripcion;}

    public double getPrecio(){ return precio;}
    public void setPrecio(double precio){ this.precio = precio;}

    public String getCategoria(){ return categoria;}
    public void setCategoria(String categoria){ this.categoria = categoria;}

    public int getStock(){ return stock;}
    public void setStock(int stock){ this.stock = stock;}

    public Proveedor getProveedor(){ return Proveedor;}
    public void setProveedor(Proveedor Proveedor){ this.Proveedor = Proveedor;}

}
