package com.example.licoreria.Controller;

import com.example.licoreria.Model.Usuario;
import com.example.licoreria.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable int id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        usuario.setFechaRegistro(LocalDate.now()); // Inicializar fechaRegistro
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable int id, @RequestBody Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null) {
            usuario.setNombre(usuarioDetails.getNombre());
            usuario.setEmail(usuarioDetails.getEmail());
            usuario.setContrasena(usuarioDetails.getContrasena());
            usuario.setRol(usuarioDetails.getRol());
            usuario.setFechaRegistro(usuarioDetails.getFechaRegistro()); // Actualizar fechaRegistro
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable int id) {
        usuarioRepository.deleteById(id);
    }
}