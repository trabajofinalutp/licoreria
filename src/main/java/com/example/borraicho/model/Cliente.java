package com.example.borraicho.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCliente;
    private int edad;
    private String nombre;
    private LocalDate fechaRegistro = LocalDate.now();

    public int getidCliente(){ return idCliente;}
    public void setidCliente(int idCliente){ this.idCliente = idCliente;}

    public int getEdad(){ return edad;}
    public void setEdad(int edad){ this.edad = edad;}

    public String getNombre(){ return nombre;}
    public void setNombre(String nombre){ this.nombre = nombre;}

    public LocalDate getFechaRegistro(){ return fechaRegistro;}
    public void setFechaRegistro(LocalDate fechaRegistro){ this.fechaRegistro = fechaRegistro;}
}
