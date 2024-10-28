package com.example.licoreria.Controller;

import com.example.licoreria.Model.Producto;
import com.example.licoreria.Repository.ProductoRepository;
import com.example.licoreria.Repository.ProveedorRepository;
import com.example.licoreria.Model.Proveedor;
import com.example.licoreria.Service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/producto")
public class ProductoController {
    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Producto getProductoById(@PathVariable int id) {
        return productoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Producto createProducto(@RequestBody Producto producto) {
        Proveedor proveedor = proveedorRepository.findById(producto.getProveedor().getIdProveedor()).orElse(null);
        producto.setProveedor(proveedor);
        return productoRepository.save(producto);
    }

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable int id, @RequestBody Producto productoDetails) {
        Producto producto = productoRepository.findById(id).orElse(null);
        if (producto != null) {
            producto.setNombre(productoDetails.getNombre());
            producto.setDescripcion(productoDetails.getDescripcion());
            producto.setPrecio(productoDetails.getPrecio());
            producto.setStock(productoDetails.getStock());
            producto.setCategoria(productoDetails.getCategoria()); // Nueva línea
            Proveedor proveedor = proveedorRepository.findById(productoDetails.getProveedor().getIdProveedor()).orElse(null);
            producto.setProveedor(proveedor);
            return productoRepository.save(producto);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable int id) {
        productoRepository.deleteById(id);
    }

    @GetMapping("/nombre/{nombre}")
    public List<Producto> getProductosByNombre(@PathVariable String nombre) {
        return productoService.findProductosByNombre(nombre);
    }

    @GetMapping("/precio")
    public List<Producto> getProductosByPrecio(@RequestParam double minPrecio, @RequestParam double maxPrecio) {
        return productoService.findProductosByPrecioBetween(minPrecio, maxPrecio);
    }
}