package com.example.borraicho.service;

import com.example.borraicho.model.Cliente;
import com.example.borraicho.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    //Constructor
    @Autowired
    private ClienteRepository clienteRepository;

    //Methods, para obtener una lista de todos los clientes
    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }

    //Methods para obtener un cliente por su id
    public Optional<Cliente> findClienteById(Integer id) {
        return clienteRepository.findById(id);
    }

    //Methods para guardar un cliente
    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    //Methods para actualizar un cliente
    public Optional<Cliente> updateCliente(Integer id, Cliente clienteDetails) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setEdad(clienteDetails.getEdad());
            cliente.setNombre(clienteDetails.getNombre());
            cliente.setFechaRegistro(clienteDetails.getFechaRegistro());
            return clienteRepository.save(cliente);
        });
    }

    //Methods para comprobar si un cliente existe
    public boolean existsById(Integer id) {
        return clienteRepository.existsById(id);
    }

    //Methods para eliminar un cliente
    public boolean deleteCliente(Integer id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
