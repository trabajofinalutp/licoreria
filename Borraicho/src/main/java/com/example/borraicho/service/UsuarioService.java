package com.example.borraicho.service;

import com.example.borraicho.model.Usuario;
import com.example.borraicho.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Metodo para obtener todos los usuarios
    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Metodo para buscar un usuario por id
    public Optional<Usuario> findUsuarioById(Integer id) {
        return usuarioRepository.findById(id);
    }

    // Metodo para guardar un nuevo usuario
    public Usuario saveUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Metodo para actualizar un usuario existente
    public Optional<Usuario> updateUsuario(Integer id, Usuario usuarioDetails) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombreUsuario(usuarioDetails.getNombreUsuario());
            usuario.setCorreoUsuario(usuarioDetails.getCorreoUsuario());
            usuario.setContrasena(usuarioDetails.getContrasena());
            usuario.setRolUsuario(usuarioDetails.getRolUsuario());
            usuario.setFechaRegistro(usuarioDetails.getFechaRegistro());
            return usuarioRepository.save(usuario);
        });
    }

    // Metodo para verificar si un usuario existe por su id
    public boolean existsById(Integer id) {
        return usuarioRepository.existsById(id);
    }

    // Metodo para eliminar un usuario por id
    public boolean deleteUsuario(Integer id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}