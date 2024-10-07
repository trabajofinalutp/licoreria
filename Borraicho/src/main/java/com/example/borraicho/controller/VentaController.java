package com.example.borraicho.controller;

import com.example.borraicho.model.Venta;
import com.example.borraicho.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/venta")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    // GET /venta, devuelve una lista de todas las ventas
    @GetMapping
    public List<Venta> getAllVentas() {
        return ventaService.findAllVentas();
    }

    // GET /venta/{id}, devuelve una venta por ID específico
    @GetMapping("/{id}")
    public ResponseEntity<Venta> getVentaById(@PathVariable Integer id) {
        Optional<Venta> venta = ventaService.findVentaById(id);
        if (venta.isPresent()) {
            return ResponseEntity.ok(venta.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /venta, crea una nueva venta
    @PostMapping
    public ResponseEntity<Venta> createVenta(@RequestBody Venta venta,
                                             @RequestParam Integer idCliente,
                                             @RequestParam Integer idUsuario) {
        try {
            Venta nuevaVenta = ventaService.saveVenta(venta, idCliente, idUsuario);
            return ResponseEntity.ok(nuevaVenta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // PUT /venta/{id}, actualiza una venta existente
    @PutMapping("/{id}")
    public ResponseEntity<Venta> updateVenta(@PathVariable Integer id,
                                             @RequestBody Venta ventaDetails,
                                             @RequestParam Integer idCliente,
                                             @RequestParam Integer idUsuario) {
        Optional<Venta> updatedVenta = ventaService.updateVenta(id, ventaDetails, idCliente, idUsuario);
        if (updatedVenta.isPresent()) {
            return ResponseEntity.ok(updatedVenta.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /venta/{id}, elimina una venta existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenta(@PathVariable Integer id) {
        if (ventaService.deleteVenta(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
