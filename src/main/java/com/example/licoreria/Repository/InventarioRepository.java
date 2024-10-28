package com.example.licoreria.Repository;

import com.example.licoreria.Model.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventarioRepository extends JpaRepository<Inventario, Integer> {
}
