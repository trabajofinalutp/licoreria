package com.example.borraicho.controller;

import com.example.borraicho.model.Proveedor;
import com.example.borraicho.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.ClientInfoStatus;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/proveedor")
public class ProveedorController {

    @Autowired
    private ProveedorRepository proveedorRepository;

    //GET /proveedor, devuelve una lista
    @GetMapping
    public List<Proveedor> getAllProveedores() {
        return proveedorRepository.findAll();
    }

    //GET /proveedor/{id} devuelve un proveedor con id especifico
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> getProveedorById(@PathVariable Integer id) {
        Optional<Proveedor> proveedor = proveedorRepository.findById(id);
        if (proveedor.isPresent()) {
            return ResponseEntity.ok(proveedor.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //POST /proveedor, crea un nuevo proveedor
    @PostMapping
    public Proveedor createProveedor(@RequestBody Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    //PUT /proveedor/{id}, actualiza un proveedor existente
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> updateProveedor(@PathVariable Integer id, @RequestBody Proveedor proveedorDetails) {
        Optional<Proveedor> proveedor = proveedorRepository.findById(id);
        if (proveedor.isPresent()) {
            Proveedor existingProveedor = proveedor.get();
            existingProveedor.setNombreProveedor(proveedorDetails.getNombreProveedor());
            // Actualiza otros campos según sea necesario

            Proveedor updatedProveedor = proveedorRepository.save(existingProveedor);
            return ResponseEntity.ok(updatedProveedor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //DELETE /proveedor/{id}, elimina un proveedor existente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Integer id) {
        Optional<Proveedor> proveedor = proveedorRepository.findById(id);
        if (proveedor.isPresent()) {
            proveedorRepository.delete(proveedor.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

