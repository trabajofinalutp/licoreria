package com.example.borraicho.service;

import com.example.borraicho.model.Proveedor;
import com.example.borraicho.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {

    @Autowired
    private ProveedorRepository proveedorRepository;

    // Método para obtener una lista de todos los proveedores
    public List<Proveedor> findAllProveedores() {
        return proveedorRepository.findAll();
    }

    // Método para obtener un proveedor por su id
    public Optional<Proveedor> findProveedorById(Integer id) {
        return proveedorRepository.findById(id);
    }

    // Método para guardar un proveedor
    @Transactional
    public Proveedor saveProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    // Método para actualizar un proveedor
    @Transactional
    public Optional<Proveedor> updateProveedor(Integer id, Proveedor proveedorDetails) {
        return proveedorRepository.findById(id).map(proveedor -> {
            proveedor.setNombreProveedor(proveedorDetails.getNombreProveedor());
            proveedor.setCorreoProveedor(proveedorDetails.getCorreoProveedor());
            proveedor.setTelefonoProveedor(proveedorDetails.getTelefonoProveedor());
            proveedor.setDireccionProveedor(proveedorDetails.getDireccionProveedor());
            return proveedorRepository.save(proveedor);
        });
    }

    // Método para comprobar si un proveedor existe
    public boolean existsById(Integer id) {
        return proveedorRepository.existsById(id);
    }

    // Método para eliminar un proveedor
    @Transactional
    public boolean deleteProveedor(Integer id) {
        if (proveedorRepository.existsById(id)) {
            proveedorRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
