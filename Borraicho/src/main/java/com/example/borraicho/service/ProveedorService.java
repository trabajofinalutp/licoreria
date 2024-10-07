package com.example.borraicho.service;

import com.example.borraicho.model.Proveedor;
import com.example.borraicho.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

    @Service
    public class ProveedorService {

        @Autowired
        private ProveedorRepository proveedorRepository;

        //Metodo para obtener una lista de todos los proveedores
        public List<Proveedor> findAllProveedores() {
            return proveedorRepository.findAll();
        }

        //Metodo para obtener un proveedor por su id
        public Optional<Proveedor> findProveedorById(Integer id) {
            return proveedorRepository.findById(id);
        }

        //Metodo para guardar un proveedor
        public Proveedor saveProveedor(Proveedor proveedor) {
            return proveedorRepository.save(proveedor);
        }

        //Metodo para actualizar un proveedor
        public Optional<Proveedor> updateProveedor(Integer id, Proveedor proveedorDetails) {
            return proveedorRepository.findById(id).map(proveedor -> {
                proveedor.setNombreProveedor(proveedorDetails.getNombreProveedor());
                // Actualiza otros campos según sea necesario
                return proveedorRepository.save(proveedor);
            });
        }

        //Metodo para comprobar si un proveedor existe
        public boolean existsById(Integer id) {
            return proveedorRepository.existsById(id);
        }

        //Metodo para eliminar un proveedor
        public boolean deleteProveedor(Integer id) {
            if (proveedorRepository.existsById(id)) {
                proveedorRepository.deleteById(id);
                return true;
            } else {
                return false;
            }
        }
    }

