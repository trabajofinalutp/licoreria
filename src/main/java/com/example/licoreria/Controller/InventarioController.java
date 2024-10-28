package com.example.licoreria.Controller;

import com.example.licoreria.Model.Inventario;
import com.example.licoreria.Repository.InventarioRepository;
import com.example.licoreria.Repository.ProductoRepository;
import com.example.licoreria.Model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventario")
public class InventarioController {

    @Autowired
    private InventarioRepository inventarioRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Inventario> getAllInventarios() {
        return inventarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Inventario getInventarioById(@PathVariable int id) {
        return inventarioRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Inventario createInventario(@RequestBody Inventario inventario) {
        Producto producto = productoRepository.findById(inventario.getProducto().getIdProducto()).orElse(null);
        inventario.setProducto(producto);
        return inventarioRepository.save(inventario);
    }

    @PutMapping("/{id}")
    public Inventario updateInventario(@PathVariable int id, @RequestBody Inventario inventarioDetails) {
        Inventario inventario = inventarioRepository.findById(id).orElse(null);
        if (inventario != null) {
            inventario.setCantidad(inventarioDetails.getCantidad());
            Producto producto = productoRepository.findById(inventarioDetails.getProducto().getIdProducto()).orElse(null);
            inventario.setProducto(producto);
            return inventarioRepository.save(inventario);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteInventario(@PathVariable int id) {
        inventarioRepository.deleteById(id);
    }
}