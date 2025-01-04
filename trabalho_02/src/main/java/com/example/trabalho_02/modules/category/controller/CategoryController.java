package com.example.trabalho_02.modules.category.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalho_02.modules.catalog.services.CatalogMovieService;
import com.example.trabalho_02.modules.category.model.Category;
import com.example.trabalho_02.modules.category.services.CategoryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/category")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Object> createCategory(@Valid @RequestBody Category entity) {
        try {
            var result = categoryService.createCategory(entity);
            return ResponseEntity.status(201).body(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> getCategoriesWithPagination(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10") int size) {
        try {
            var result = categoryService.getCategoriesWithPagination(page, size);
            return ResponseEntity.status(200).body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMovieByCategories(@PathVariable UUID id) {
        try {
            var result = categoryService.getMoviesByCategorieId(id);
            return ResponseEntity.status(200).body(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCategoryByID(@PathVariable UUID id, @Valid @RequestBody Category entity) {
        try {
            Category result = this.categoryService.updateCategory(id, entity);
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir a categoria");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCategoryByID(@PathVariable UUID id) {
        try {
            categoryService.deleteCategoryByID(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir a categoria");
        }
    }
}
