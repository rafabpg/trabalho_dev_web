package com.example.trabalho_02.modules.category.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "O nome da categoria não pode ser vazio.")
    @Size(min = 3, max = 50, message = "O nome da categoria deve ter entre 3 e 50 caracteres.")
    private String nome;
}
