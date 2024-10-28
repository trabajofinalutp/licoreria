package com.example.licoreria.Controller;

import com.example.licoreria.Model.Venta;
import com.example.licoreria.Repository.VentaRepository;
import com.example.licoreria.Repository.ClienteRepository;
import com.example.licoreria.Repository.ProductoRepository;
import com.example.licoreria.Model.Cliente;
import com.example.licoreria.Model.Producto;
import com.example.licoreria.Service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/venta")
public class VentaController {
    @Autowired
    private VentaService ventaService;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private VentaRepository ventaRepository;

    @GetMapping
    public List<Venta> getAllVentas() {
        return ventaService.findAllVentas();
    }

    @GetMapping("/{id}")
    public Venta getVentaById(@PathVariable int id) {
        return ventaService.findVentaById(id).orElse(null);
    }

    @PostMapping
    public Venta createVenta(@RequestBody Venta venta) {
        try {
            Cliente cliente = clienteRepository.findById(venta.getCliente().getIdCliente()).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
            Producto producto = productoRepository.findById(venta.getProducto().getIdProducto()).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            venta.setCliente(cliente);
            venta.setProducto(producto);
            return ventaService.saveVenta(venta);
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error creating venta: " + e.getMessage());
            throw e; // Re-throw the exception to be handled by Spring's exception handler
        }
    }

    @PutMapping("/{id}")
    public Venta updateVenta(@PathVariable int id, @RequestBody Venta ventaDetails) {
        return ventaService.updateVenta(id, ventaDetails).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteVenta(@PathVariable int id) {ventaRepository.deleteById(id);}
}