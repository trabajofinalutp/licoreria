package com.example.borraicho.controller;

import com.example.borraicho.model.Proveedor;
import com.example.borraicho.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/proveedor")
public class ProveedorController {

    @Autowired
    private ProveedorService proveedorService;

    // GET /proveedor, devuelve una lista de proveedores
    @GetMapping
    public List<Proveedor> getAllProveedores() {
        return proveedorService.findAllProveedores();
    }

    // GET /proveedor/{id}, devuelve un proveedor con id específico
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> getProveedorById(@PathVariable Integer id) {
        Optional<Proveedor> proveedor = proveedorService.findProveedorById(id);
        return proveedor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /proveedor, crea un nuevo proveedor
    @PostMapping
    public ResponseEntity<Proveedor> createProveedor(@RequestBody Proveedor proveedor) {
        Proveedor nuevoProveedor = proveedorService.saveProveedor(proveedor);
        return ResponseEntity.ok(nuevoProveedor);
    }

    // PUT /proveedor/{id}, actualiza un proveedor existente
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> updateProveedor(@PathVariable Integer id, @RequestBody Proveedor proveedorDetails) {
        Optional<Proveedor> updatedProveedor = proveedorService.updateProveedor(id, proveedorDetails);
        return updatedProveedor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /proveedor/{id}, elimina un proveedor existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Integer id) {
        boolean deleted = proveedorService.deleteProveedor(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
