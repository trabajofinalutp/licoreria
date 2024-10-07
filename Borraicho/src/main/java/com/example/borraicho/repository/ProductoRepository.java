package com.example.borraicho.repository;

import com.example.borraicho.model.Producto;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository< Producto, Integer> {
}
