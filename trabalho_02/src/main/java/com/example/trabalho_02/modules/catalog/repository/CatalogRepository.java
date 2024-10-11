package com.example.trabalho_02.modules.catalog.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.trabalho_02.modules.catalog.model.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, UUID>{
    
}
