package com.example.licoreria.Controller;

import com.example.licoreria.Model.Proveedor;
import com.example.licoreria.Service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/proveedor")
public class ProveedorController {
    @Autowired
    private ProveedorService proveedorService;

    @GetMapping
    public List<Proveedor> getAllProveedores() {
        return proveedorService.findAllProveedores();
    }

    @GetMapping("/{id}")
    public Optional<Proveedor> getProveedorById(@PathVariable int id) {
        return proveedorService.findProveedorById(id);
    }

    @PostMapping
    public Proveedor createProveedor(@RequestBody Proveedor proveedor) {
        return proveedorService.saveProveedor(proveedor);
    }

    @PutMapping("/{id}")
    public Optional<Proveedor> updateProveedor(@PathVariable int id, @RequestBody Proveedor proveedorDetails) {
        return proveedorService.updateProveedor(id, proveedorDetails);
    }

    @DeleteMapping("/{id}")
    public boolean deleteProveedor(@PathVariable int id) {
        return proveedorService.deleteProveedor(id);
    }
}