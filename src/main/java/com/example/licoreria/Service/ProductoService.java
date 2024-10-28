package com.example.licoreria.Service;

import com.example.licoreria.Model.Producto;
import com.example.licoreria.Repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    // Constructor
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Methods para obtener una lista de todos los productos
    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
    }

    // Methods para obtener un producto por su id
    public Optional<Producto> findProductoById(Integer id) {
        return productoRepository.findById(id);
    }

    // Methods para guardar un producto
    public Producto saveProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    // Methods para actualizar un producto
    public Optional<Producto> updateProducto(Integer id, Producto productoDetails) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoDetails.getNombre());
            producto.setDescripcion(productoDetails.getDescripcion());
            producto.setPrecio(productoDetails.getPrecio());
            producto.setStock(productoDetails.getStock());
            producto.setCategoria(productoDetails.getCategoria()); // Nueva línea
            producto.setProveedor(productoDetails.getProveedor());
            return productoRepository.save(producto);
        });
    }

    // Methods para comprobar si un producto existe
    public boolean existsById(Integer id) {
        return productoRepository.existsById(id);
    }

    // Methods para eliminar un producto
    public boolean deleteProducto(Integer id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    // Methods para buscar productos por nombre
    public List<Producto> findProductosByNombre(String nombre) {
        return productoRepository.findByNombreContaining(nombre);
    }

    // Methods para buscar productos por rango de precio
    public List<Producto> findProductosByPrecioBetween(double minPrecio, double maxPrecio) {
        return productoRepository.findByPrecioBetween(minPrecio, maxPrecio);
    }
}