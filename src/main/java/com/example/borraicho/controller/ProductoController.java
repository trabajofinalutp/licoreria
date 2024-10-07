package com.example.borraicho.controller;

import com.example.borraicho.model.Producto;
import com.example.borraicho.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // GET /producto, devuelve una lista de todos los productos
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.findAllProductos();
    }

    // GET /producto/{id}, devuelve un producto por id específico
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Integer id) {
        Optional<Producto> producto = productoService.findProductoById(id);
        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /producto, crea un nuevo producto
    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto, @RequestParam(required = false, defaultValue = "1") Integer idProveedor) {
        try {
            Producto nuevoProducto = productoService.saveProducto(producto, idProveedor);
            return ResponseEntity.ok(nuevoProducto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Retorna un error si el proveedor no existe
        }
    }

    // PUT /producto/{id}, actualiza un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Integer id, @RequestBody Producto productoDetails, @RequestParam(required = false, defaultValue = "1") Integer idProveedor) {
        Optional<Producto> updatedProducto = productoService.updateProducto(id, productoDetails, idProveedor);
        if (updatedProducto.isPresent()) {
            return ResponseEntity.ok(updatedProducto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /producto/{id}, elimina un producto existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Integer id) {
        boolean deleted = productoService.deleteProducto(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}