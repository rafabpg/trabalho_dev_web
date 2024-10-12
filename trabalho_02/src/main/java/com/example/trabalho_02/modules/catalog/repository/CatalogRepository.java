package com.example.trabalho_02.modules.catalog.repository;

import java.util.UUID;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.trabalho_02.modules.catalog.model.Catalog;
import com.example.trabalho_02.modules.catalog.model.Movie;
import com.example.trabalho_02.modules.catalog.model.Serie;
import com.example.trabalho_02.modules.category.model.Category;

public interface CatalogRepository extends JpaRepository<Catalog, UUID>{
    @Query("SELECT m FROM Movie m") 
    Page<Movie> findAllMovies(Pageable pageable);

    @Query("SELECT s FROM Serie s") 
    Page<Serie> findAllSeries(Pageable pageable);

    List<Catalog> findAllByCategory(Category category);
}
