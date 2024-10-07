package com.example.borraicho.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUsuario;

    private String nombreUsuario;
    private String correoUsuario;
    private String contrasena;
    private String rolUsuario;
    private LocalDate fechaRegistro = LocalDate.now();

    public int getIdUsuario(){ return idUsuario;}
    public void setIdUsuario(int idUsuario){ this.idUsuario = idUsuario;}

    public String getNombreUsuario(){ return nombreUsuario;}
    public void setNombreUsuario(String nombreUsuario){ this.nombreUsuario = nombreUsuario;}

    public String getCorreoUsuario(){ return correoUsuario;}
    public void setCorreoUsuario(String correoUsuario){ this.correoUsuario = correoUsuario;}

    public String getContrasena(){ return contrasena;}
    public void setContrasena(String contrasena){ this.contrasena = contrasena;}

    public String getRolUsuario(){ return rolUsuario;}
    public void setRolUsuario(String rolUsuario){ this.rolUsuario = rolUsuario;}

    public LocalDate getFechaRegistro(){ return fechaRegistro;}
    public void setFechaRegistro(LocalDate fechaRegistro){ this.fechaRegistro = fechaRegistro;}
}
