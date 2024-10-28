package com.example.licoreria.Repository;

import com.example.licoreria.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findByNombreContaining(String nombre);
    List<Producto> findByPrecioBetween(double minPrecio, double maxPrecio);
}