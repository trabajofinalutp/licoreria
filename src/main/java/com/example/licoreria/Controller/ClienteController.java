package com.example.licoreria.Controller;

import com.example.licoreria.Model.Cliente;
import com.example.licoreria.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cliente getClienteById(@PathVariable int id) {
        return clienteRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        cliente.setFecha_registro(LocalDate.now()); // Inicializar fechaRegistro
        return clienteRepository.save(cliente);
    }

    @PutMapping("/{id}")
    public Cliente updateCliente(@PathVariable int id, @RequestBody Cliente clienteDetails) {
        Cliente cliente = clienteRepository.findById(id).orElse(null);
        if (cliente != null) {
            cliente.setNombre(clienteDetails.getNombre());
            cliente.setEdad(clienteDetails.getEdad());
            cliente.setFecha_registro(clienteDetails.getFecha_registro()); // Actualizar fechaRegistro
            return clienteRepository.save(cliente);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable int id) {
        clienteRepository.deleteById(id);
    }
}