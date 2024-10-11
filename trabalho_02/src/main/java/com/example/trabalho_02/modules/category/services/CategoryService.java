package com.example.trabalho_02.modules.category.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.trabalho_02.exceptions.CategoryNameAlreadyExist;
import com.example.trabalho_02.modules.catalog.repository.CatalogRepository;
import com.example.trabalho_02.modules.category.model.Category;
import com.example.trabalho_02.modules.category.repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CatalogRepository catalogRepository;

    public Category createCategory(Category category){
        this.categoryRepository.findByNome(category.getNome()).ifPresent((course)->{
            throw new CategoryNameAlreadyExist();
        });
        return this.categoryRepository.save(category);
    }

    public Category updateCategory(UUID id, Category updatedCategory) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        if (!existingCategory.getNome().equals(updatedCategory.getNome())) {
            categoryRepository.findByNome(updatedCategory.getNome()).ifPresent((category) -> {
                throw new CategoryNameAlreadyExist();
            });
        }
        existingCategory.setNome(updatedCategory.getNome());
        return categoryRepository.save(existingCategory);
    }

    public Page<Category> getCategoriesWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return categoryRepository.findAll(pageable);
    }

    public void deleteCategoryByID(UUID id){
        Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        categoryRepository.delete(category);
    }


}
