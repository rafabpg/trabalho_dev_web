package com.example.trabalho_02.exceptions;

public class CategoryNameAlreadyExist extends RuntimeException {
    public CategoryNameAlreadyExist() {
        super("Category name already exists");
    }
}
