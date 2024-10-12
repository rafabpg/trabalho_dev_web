package com.example.trabalho_02.modules.catalog.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalho_02.modules.catalog.DTO.MovieDTO;
import com.example.trabalho_02.modules.catalog.services.CatalogMovieService;
import com.example.trabalho_02.modules.category.model.Category;

import java.util.UUID;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/catalog/movie")
public class CatalogMovieController {


    @Autowired
    private CatalogMovieService catalogMovieService;

    @PostMapping
    public ResponseEntity<Object>  createMovie(@Valid @RequestBody MovieDTO movieDto) {
        try {
            var result = this.catalogMovieService.createMovie(movieDto);
            return ResponseEntity.status(201).body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public  ResponseEntity<Object> getAllMovies(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size) {
        try {
            var result = this.catalogMovieService.getMoviesWithPagination(page, size);
            return ResponseEntity.status(200).body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMovie(@PathVariable UUID id) {
        try {
            this.catalogMovieService.deleteMovie(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable UUID id, @Valid @RequestBody MovieDTO entity) {
        try {
            var result = this.catalogMovieService.updateMovie(id, entity);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir a categoria");
        }
    }



}
