package com.example.trabalho_02.modules.catalog.controller;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalho_02.modules.catalog.DTO.SeriesDTO;
import com.example.trabalho_02.modules.catalog.services.CatalogSeriesService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/catalog/series")
public class CatalogSeriesController {
    
    @Autowired
    private CatalogSeriesService catalogSerieService;

    @PostMapping
    public ResponseEntity<Object>  createSerie(@Valid @RequestBody SeriesDTO serieDto) {
        try {
            var result = this.catalogSerieService.createSerie(serieDto);
            return ResponseEntity.status(201).body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public  ResponseEntity<Object> getAllSeries(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size) {
        try {
            var result = this.catalogSerieService.getSeriesWithPagination(page, size);
            return ResponseEntity.status(200).body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSerie(@PathVariable UUID id) {
        try {
            this.catalogSerieService.deleteSerie(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSerie(@PathVariable UUID id, @Valid @RequestBody SeriesDTO entity) {
        try {
            var result = this.catalogSerieService.updateSerie(id, entity);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir a categoria");
        }
    }

}
