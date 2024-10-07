package com.example.borraicho.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idProveedor;

    private String nombreProveedor;
    private int telefonoProveedor;
    private String direccionProveedor;
    private String correoProveedor;

    public int getIdProveedor(){ return idProveedor;}
    public void setIdProveedor(int idProveedor){ this.idProveedor = idProveedor;}

    public String getNombreProveedor(){ return nombreProveedor;}
    public void setNombreProveedor(String nombreProveedor){ this.nombreProveedor = nombreProveedor;}

    public int getTelefonoProveedor(){ return telefonoProveedor;}
    public void setTelefonoProveedor(int telefonoProveedor){ this.telefonoProveedor = telefonoProveedor;}

    public String getDireccionProveedor(){ return direccionProveedor;}
    public void setDireccionProveedor(String direccionProveedor){ this.direccionProveedor = direccionProveedor;}

    public String getCorreoProveedor(){ return correoProveedor;}
    public void setCorreoProveedor(String correoProveedor){ this.correoProveedor = correoProveedor;}
}
