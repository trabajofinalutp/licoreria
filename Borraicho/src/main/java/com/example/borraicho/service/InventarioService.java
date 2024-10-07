package com.example.borraicho.service;


import com.example.borraicho.model.Inventario;
import com.example.borraicho.model.Producto;
import com.example.borraicho.repository.InventarioRepository;
import com.example.borraicho.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    // Metodo para obtener todas las entradas del inventario
    public List<Inventario> findAllInventario() {
        return inventarioRepository.findAll();
    }

    // Metodo para obtener una entrada de inventario por su ID
    public Optional<Inventario> findInventarioById(Integer id) {
        return inventarioRepository.findById(id);
    }

    // Metodo para guardar una nueva entrada en el inventario
    public Inventario saveInventario(Inventario inventario, Integer idProducto) {
        Optional<Producto> producto = productoRepository.findById(idProducto);

        if (producto.isPresent()) {
            inventario.setProducto(producto.get());
            return inventarioRepository.save(inventario);
        } else {
            throw new RuntimeException("Producto no encontrado");
        }
    }

    // Metodo para actualizar una entrada existente en el inventario
    public Optional<Inventario> updateInventario(Integer id, Inventario inventarioDetails, Integer idProducto) {
        return inventarioRepository.findById(id).map(inventario -> {
            inventario.setFechaIngreso(inventarioDetails.getFechaIngreso());
            inventario.setCantidad(inventarioDetails.getCantidad());

            Optional<Producto> producto = productoRepository.findById(idProducto);
            if (producto.isPresent()) {
                inventario.setProducto(producto.get());
                return inventarioRepository.save(inventario);
            } else {
                throw new RuntimeException("Producto no encontrado");
            }
        });
    }

    // Metodo para eliminar una entrada de inventario por su ID
    public boolean deleteInventario(Integer id) {
        if (inventarioRepository.existsById(id)) {
            inventarioRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    // Metodo para verificar si una entrada de inventario existe por su ID
    public boolean existsById(Integer id) {
        return inventarioRepository.existsById(id);
    }
}
