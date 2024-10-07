package com.example.borraicho.controller;

import com.example.borraicho.model.Producto;
import com.example.borraicho.model.Proveedor;
import com.example.borraicho.repository.ProductoRepository;
import com.example.borraicho.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
    @RequestMapping("/producto")
    public class ProductoController {

        @Autowired
        private ProductoRepository productoRepository;

        @Autowired
        private ProveedorRepository proveedorRepository;

        // GET /producto, devuelve una lista de todos los productos
        @GetMapping
        public List<Producto> getAllProductos() {
            return productoRepository.findAll();
        }

        // GET /producto/{id}, devuelve un producto por id específico
        @GetMapping("/{id}")
        public ResponseEntity<Producto> getProductoById(@PathVariable Integer id) {
            Optional<Producto> producto = productoRepository.findById(id);
            if (producto.isPresent()) {
                return ResponseEntity.ok(producto.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        // POST /producto, crea un nuevo producto
        @PostMapping
        public ResponseEntity<Producto> createProducto(@RequestBody Producto producto, @RequestParam Integer idProveedor) {
            // Busca el proveedor por id
            Optional<Proveedor> proveedor = proveedorRepository.findById(idProveedor);
            if (proveedor.isPresent()) {
                producto.setProveedor(proveedor.get());
                Producto nuevoProducto = productoRepository.save(producto);
                return ResponseEntity.ok(nuevoProducto);
            } else {
                return ResponseEntity.badRequest().body(null); // Retorna un error si el proveedor no existe
            }
        }

        // PUT /producto/{id}, actualiza un producto existente
        @PutMapping("/{id}")
        public ResponseEntity<Producto> updateProducto(@PathVariable Integer id, @RequestBody Producto productoDetails, @RequestParam Integer idProveedor) {
            Optional<Producto> producto = productoRepository.findById(id);
            if (producto.isPresent()) {
                Producto existingProducto = producto.get();

                // Actualiza los campos del producto
                existingProducto.setNombreProducto(productoDetails.getNombreProducto());
                existingProducto.setDescripcion(productoDetails.getDescripcion());
                existingProducto.setPrecio(productoDetails.getPrecio());
                existingProducto.setCategoria(productoDetails.getCategoria());
                existingProducto.setStock(productoDetails.getStock());

                // Busca el proveedor por id y lo asigna
                Optional<Proveedor> proveedor = proveedorRepository.findById(idProveedor);
                if (proveedor.isPresent()) {
                    existingProducto.setProveedor(proveedor.get());
                } else {
                    return ResponseEntity.badRequest().body(null); // Retorna error si el proveedor no existe
                }

                Producto updatedProducto = productoRepository.save(existingProducto);
                return ResponseEntity.ok(updatedProducto);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        // DELETE /producto/{id}, elimina un producto existente
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteProducto(@PathVariable Integer id) {
            Optional<Producto> producto = productoRepository.findById(id);
            if (producto.isPresent()) {
                productoRepository.delete(producto.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        }
}
