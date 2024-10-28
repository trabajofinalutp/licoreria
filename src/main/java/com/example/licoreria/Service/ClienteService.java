package com.example.licoreria.Service;

import com.example.licoreria.Model.Cliente;
import com.example.licoreria.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findClienteById(int id) {
        return clienteRepository.findById(id);
    }

    public Cliente saveCliente(Cliente cliente) {
        if (cliente.getFecha_registro() == null) {
            cliente.setFecha_registro(LocalDate.now());
        }
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> updateCliente(int id, Cliente clienteDetails) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setNombre(clienteDetails.getNombre());
            cliente.setEdad(clienteDetails.getEdad());
            cliente.setFecha_registro(clienteDetails.getFecha_registro());
            return clienteRepository.save(cliente);
        });
    }

    public void deleteCliente(int id) {
        clienteRepository.deleteById(id);
    }
}