package com.example.borraicho.service;

import com.example.borraicho.model.Producto;
import com.example.borraicho.model.Proveedor;
import com.example.borraicho.repository.ProductoRepository;
import com.example.borraicho.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    // Metodo para obtener una lista de todos los productos
    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
    }

    // Metodo para obtener un producto por su id
    public Optional<Producto> findProductoById(Integer id) {
        return productoRepository.findById(id);
    }

    // Metodo para guardar un producto con un proveedor
    public Producto saveProducto(Producto producto, Integer idProveedor) {
        Optional<Proveedor> proveedor = proveedorRepository.findById(idProveedor);
        if (proveedor.isPresent()) {
            producto.setProveedor(proveedor.get());
            return productoRepository.save(producto);
        } else {
            throw new RuntimeException("Proveedor con ID " + idProveedor + " no encontrado");
        }
    }

    // Metodo para actualizar un producto existente
    public Optional<Producto> updateProducto(Integer id, Producto productoDetails, Integer idProveedor) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombreProducto(productoDetails.getNombreProducto());
            producto.setDescripcion(productoDetails.getDescripcion());
            producto.setPrecio(productoDetails.getPrecio());
            producto.setCategoria(productoDetails.getCategoria());
            producto.setStock(productoDetails.getStock());

            Optional<Proveedor> proveedor = proveedorRepository.findById(idProveedor);
            if (proveedor.isPresent()) {
                producto.setProveedor(proveedor.get());
            } else {
                throw new RuntimeException("Proveedor con ID " + idProveedor + " no encontrado");
            }

            return productoRepository.save(producto);
        });
    }

    // Metodo para verificar si un producto existe por su id
    public boolean existsById(Integer id) {
        return productoRepository.existsById(id);
    }

    // Metodo para eliminar un producto por su id
    public boolean deleteProducto(Integer id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
