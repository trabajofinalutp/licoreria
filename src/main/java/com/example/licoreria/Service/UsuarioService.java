package com.example.licoreria.Service;

import com.example.licoreria.Model.Usuario;
import com.example.licoreria.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Constructor
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // Methods para obtener una lista de todos los usuarios
    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Methods para obtener un usuario por su id
    public Optional<Usuario> findUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    // Methods para guardar un usuario
    public Usuario saveUsuario(Usuario usuario) {
        usuario.setFechaRegistro(LocalDate.now()); // Inicializar fechaRegistro
        return usuarioRepository.save(usuario);
    }

    // Methods para actualizar un usuario
    public Optional<Usuario> updateUsuario(Integer id, Usuario usuarioDetails) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(usuarioDetails.getNombre());
            usuario.setEmail(usuarioDetails.getEmail());
            usuario.setContrasena(usuarioDetails.getContrasena());
            usuario.setRol(usuarioDetails.getRol());
            usuario.setFechaRegistro(usuarioDetails.getFechaRegistro()); // Actualizar fechaRegistro
            return usuarioRepository.save(usuario);
        });
    }

    // Methods para comprobar si un usuario existe
    public boolean existsById(Integer id) {
        return usuarioRepository.existsById(id);
    }

    // Methods para eliminar un usuario
    public boolean deleteUsuario(Integer id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}