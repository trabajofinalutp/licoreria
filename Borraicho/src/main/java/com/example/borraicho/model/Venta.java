package com.example.borraicho.model;

import jakarta.persistence.*;

@Entity
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVenta;

    @ManyToOne
    @JoinColumn(name = "idCliente")
    private Cliente cliente;
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    private String fechaVenta; // Se puede usar LocalDateTime
    private double total;

    public int getIdVenta() {return idVenta;}
    public void setIdVenta(int idVenta) {this.idVenta = idVenta;}

    public Cliente getCliente() {return cliente;}
    public void setCliente(Cliente cliente) {this.cliente = cliente;}

    public Usuario getUsuario() {return usuario;}
    public void setUsuario(Usuario usuario) {this.usuario = usuario;}

    public String getFechaVenta() {return fechaVenta;}
    public void setFechaVenta(String fechaVenta) {this.fechaVenta = fechaVenta;}

    public double getTotal() {return total;}
    public void setTotal(double total) {this.total = total;}
}
