package com.example.borraicho.controller;

import com.example.borraicho.model.Inventario;
import com.example.borraicho.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/inventario")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    // GET /inventario, devuelve una lista de todas las entradas del inventario
    @GetMapping
    public List<Inventario> getAllInventario() {
        return inventarioService.findAllInventario();
    }

    // GET /inventario/{id}, devuelve una entrada de inventario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Inventario> getInventarioById(@PathVariable Integer id) {
        Optional<Inventario> inventario = inventarioService.findInventarioById(id);
        if (inventario.isPresent()) {
            return ResponseEntity.ok(inventario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /inventario, crea una nueva entrada en el inventario
    @PostMapping
    public ResponseEntity<Inventario> createInventario(@RequestBody Inventario inventario,
                                                       @RequestParam Integer idProducto) {
        try {
            Inventario nuevoInventario = inventarioService.saveInventario(inventario, idProducto);
            return ResponseEntity.ok(nuevoInventario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // PUT /inventario/{id}, actualiza una entrada existente en el inventario
    @PutMapping("/{id}")
    public ResponseEntity<Inventario> updateInventario(@PathVariable Integer id,
                                                       @RequestBody Inventario inventarioDetails,
                                                       @RequestParam Integer idProducto) {
        Optional<Inventario> updatedInventario = inventarioService.updateInventario(id, inventarioDetails, idProducto);
        if (updatedInventario.isPresent()) {
            return ResponseEntity.ok(updatedInventario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /inventario/{id}, elimina una entrada existente del inventario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventario(@PathVariable Integer id) {
        if (inventarioService.deleteInventario(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}