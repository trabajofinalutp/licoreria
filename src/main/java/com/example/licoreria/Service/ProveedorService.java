package com.example.licoreria.Service;

import com.example.licoreria.Model.Proveedor;
import com.example.licoreria.Repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {
    @Autowired
    private ProveedorRepository proveedorRepository;

    // Constructor
    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    // Methods para obtener una lista de todos los proveedores
    public List<Proveedor> findAllProveedores() {
        return proveedorRepository.findAll();
    }

    // Methods para obtener un proveedor por su id
    public Optional<Proveedor> findProveedorById(Integer id) {
        return proveedorRepository.findById(id);
    }

    // Methods para guardar un proveedor
    public Proveedor saveProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    // Methods para actualizar un proveedor
    public Optional<Proveedor> updateProveedor(Integer id, Proveedor proveedorDetails) {
        return proveedorRepository.findById(id).map(proveedor -> {
            proveedor.setNombre(proveedorDetails.getNombre());
            proveedor.setDireccion(proveedorDetails.getDireccion());
            proveedor.setTelefono(proveedorDetails.getTelefono());
            proveedor.setEmail(proveedorDetails.getEmail());
            return proveedorRepository.save(proveedor);
        });
    }

    // Methods para comprobar si un proveedor existe
    public boolean existsById(Integer id) {
        return proveedorRepository.existsById(id);
    }

    // Methods para eliminar un proveedor
    public boolean deleteProveedor(Integer id) {
        if (proveedorRepository.existsById(id)) {
            proveedorRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}