package com.example.trabalho_02.modules.catalog.model;

import java.util.List;
import java.util.UUID;

import com.example.trabalho_02.modules.category.model.Category;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "catalog_type", discriminatorType = DiscriminatorType.STRING)
public class Catalog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "O título não pode ser vazio.")
    @Size(min = 1, max = 100, message = "O título deve ter entre 1 e 100 caracteres.")
    private String title;

    @Size(max = 500, message = "A descrição deve ter no máximo 500 caracteres.")
    private String description;

    @ElementCollection
    @NotEmpty(message = "A lista de personagens não pode ser vazia.")
    private List<String> characters;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "catalog_category", 
        joinColumns = @JoinColumn(name = "catalog_id"), 
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @NotEmpty(message = "O catálogo deve ter pelo menos uma categoria.")
    private List<Category> category;

    @NotNull(message = "O ano é obrigatório.")
    @Min(value = 1888, message = "O ano deve ser posterior a 1888.")
    private Integer year;

    @NotBlank(message = "A URL da imagem não pode ser vazia.")  
    private String imageUrl;

    @NotNull(message = "A disponibilidade é obrigatória.")
    private Boolean isAvailable;

    @NotNull(message = "O tipo de mídia é obrigatório.")
    @Enumerated(EnumType.STRING)
    private MediaType mediaType;
}
