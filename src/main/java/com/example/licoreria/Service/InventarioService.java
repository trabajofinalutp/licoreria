package com.example.licoreria.Service;

import com.example.licoreria.Model.Inventario;
import com.example.licoreria.Repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;

    // Constructor
    public InventarioService(InventarioRepository inventarioRepository) {
        this.inventarioRepository = inventarioRepository;
    }

    // Methods para obtener una lista de todos los inventarios
    public List<Inventario> findAllInventarios() {
        return inventarioRepository.findAll();
    }

    // Methods para obtener un inventario por su id
    public Optional<Inventario> findInventarioById(Integer id) {
        return inventarioRepository.findById(id);
    }

    // Methods para guardar un inventario
    public Inventario saveInventario(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    // Methods para actualizar un inventario
    public Optional<Inventario> updateInventario(Integer id, Inventario inventarioDetails) {
        return inventarioRepository.findById(id).map(inventario -> {
            inventario.setProducto(inventarioDetails.getProducto());
            inventario.setCantidad(inventarioDetails.getCantidad());
            inventario.setFechaActualizacion(inventarioDetails.getFechaActualizacion());
            return inventarioRepository.save(inventario);
        });
    }

    // Methods para comprobar si un inventario existe
    public boolean existsById(Integer id) {
        return inventarioRepository.existsById(id);
    }

    // Methods para eliminar un inventario
    public boolean deleteInventario(Integer id) {
        if (inventarioRepository.existsById(id)) {
            inventarioRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}