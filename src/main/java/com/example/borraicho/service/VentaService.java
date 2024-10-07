package com.example.borraicho.service;

import com.example.borraicho.model.Cliente;
import com.example.borraicho.model.Usuario;
import com.example.borraicho.model.Venta;
import com.example.borraicho.repository.ClienteRepository;
import com.example.borraicho.repository.UsuarioRepository;
import com.example.borraicho.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Obtener todas las ventas
    public List<Venta> findAllVentas() {
        return ventaRepository.findAll();
    }

    // Obtener una venta por su ID
    public Optional<Venta> findVentaById(Integer id) {
        return ventaRepository.findById(id);
    }

    // Guardar una nueva venta
    public Venta saveVenta(Venta venta, Integer idCliente, Integer idUsuario) {
        Optional<Cliente> cliente = clienteRepository.findById(idCliente);
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);

        if (cliente.isPresent() && usuario.isPresent()) {
            venta.setCliente(cliente.get());
            venta.setUsuario(usuario.get());
            return ventaRepository.save(venta);
        } else {
            throw new RuntimeException("Cliente o Usuario no encontrado");
        }
    }

    // Actualizar una venta existente
    public Optional<Venta> updateVenta(Integer id, Venta ventaDetails, Integer idCliente, Integer idUsuario) {
        return ventaRepository.findById(id).map(venta -> {
            venta.setFechaVenta(ventaDetails.getFechaVenta());
            venta.setTotal(ventaDetails.getTotal());

            Optional<Cliente> cliente = clienteRepository.findById(idCliente);
            Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);

            if (cliente.isPresent() && usuario.isPresent()) {
                venta.setCliente(cliente.get());
                venta.setUsuario(usuario.get());
                return ventaRepository.save(venta);
            } else {
                throw new RuntimeException("Cliente o Usuario no encontrado");
            }
        });
    }

    // Eliminar una venta por su ID
    public boolean deleteVenta(Integer id) {
        if (ventaRepository.existsById(id)) {
            ventaRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    // Verificar si una venta existe por su ID
    public boolean existsById(Integer id) {
        return ventaRepository.existsById(id);
    }
}

