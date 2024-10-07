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

    // Método para obtener una lista de todos los productos
    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
    }

    // Método para obtener un producto por su id
    public Optional<Producto> findProductoById(Integer id) {
        return productoRepository.findById(id);
    }

    // Método para guardar un producto con un proveedor
    public Producto saveProducto(Producto producto, Integer idProveedor) {
        Optional<Proveedor> proveedor = proveedorRepository.findById(idProveedor);
        if (proveedor.isPresent()) {
            producto.setProveedor(proveedor.get());
            return productoRepository.save(producto);
        } else {
            throw new IllegalArgumentException("Proveedor no encontrado");
        }
    }

    // Método para actualizar un producto existente
    public Optional<Producto> updateProducto(Integer id, Producto productoDetails, Integer idProveedor) {
        Optional<Producto> productoOpt = productoRepository.findById(id);
        if (productoOpt.isPresent()) {
            Producto existingProducto = productoOpt.get();

            // Actualiza los campos del producto
            existingProducto.setNombreProducto(productoDetails.getNombreProducto());
            existingProducto.setDescripcion(productoDetails.getDescripcion());
            existingProducto.setPrecio(productoDetails.getPrecio());
            existingProducto.setCategoria(productoDetails.getCategoria());
            existingProducto.setStock(productoDetails.getStock());

            // Asocia el proveedor al producto
            Optional<Proveedor> proveedorOpt = proveedorRepository.findById(idProveedor);
            if (proveedorOpt.isPresent()) {
                existingProducto.setProveedor(proveedorOpt.get());
                return Optional.of(productoRepository.save(existingProducto));
            } else {
                throw new IllegalArgumentException("Proveedor no encontrado");
            }
        } else {
            return Optional.empty();
        }
    }

    // Método para verificar si un producto existe por su id
    public boolean existsById(Integer id) {
        return productoRepository.existsById(id);
    }

    // Método para eliminar un producto por su id
    public boolean deleteProducto(Integer id) {
        Optional<Producto> productoOpt = productoRepository.findById(id);
        if (productoOpt.isPresent()) {
            productoRepository.delete(productoOpt.get());
            return true;
        } else {
            return false;
        }
    }
}