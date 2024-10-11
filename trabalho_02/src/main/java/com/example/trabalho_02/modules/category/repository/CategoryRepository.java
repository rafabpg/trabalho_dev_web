package com.example.trabalho_02.modules.category.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.trabalho_02.modules.category.model.Category;

public interface CategoryRepository extends JpaRepository<Category, UUID>{
    Optional<Category> findByNome(String nome);
    Optional<Category> findById(UUID id);
}
