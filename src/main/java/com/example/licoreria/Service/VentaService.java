package com.example.licoreria.Service;

import com.example.licoreria.Model.Venta;
import com.example.licoreria.Repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VentaService {
    @Autowired
    private VentaRepository ventaRepository;

    // Constructor
    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }

    // Methods para obtener una lista de todas las ventas
    public List<Venta> findAllVentas() {
        return ventaRepository.findAll();
    }

    // Methods para obtener una venta por su id
    public Optional<Venta> findVentaById(Integer id) {
        return ventaRepository.findById(id);
    }

    // Methods para guardar una venta
    public Venta saveVenta(Venta venta) {
        venta.setFecha(LocalDate.now()); // Establecer la fecha actual
        return ventaRepository.save(venta);
    }

    // Methods para actualizar una venta
    public Optional<Venta> updateVenta(Integer id, Venta ventaDetails) {
        return ventaRepository.findById(id).map(venta -> {
            venta.setFecha(ventaDetails.getFecha());
            venta.setCliente(ventaDetails.getCliente());
            venta.setProducto(ventaDetails.getProducto());
            venta.setCantidad(ventaDetails.getCantidad());
            venta.setTotal(ventaDetails.getTotal());
            return ventaRepository.save(venta);
        });
    }

    // Methods para comprobar si una venta existe
    public boolean existsById(Integer id) {
        return ventaRepository.existsById(id);
    }

    // Methods para eliminar una venta
    public boolean deleteVenta(Integer id) {
        if (ventaRepository.existsById(id)) {
            ventaRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}