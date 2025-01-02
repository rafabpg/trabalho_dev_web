package com.example.trabalho_02.modules.catalog.DTO;

import java.util.List;
import java.util.UUID;

import com.example.trabalho_02.modules.catalog.model.MediaType;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CatalogDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "O título não pode ser vazio.")
    @Size(min = 1, max = 100, message = "O título deve ter entre 1 e 100 caracteres.")
    private String title;

    @Size(max = 500, message = "A descrição deve ter no máximo 500 caracteres.")
    private String description;

    @NotEmpty(message = "A lista de personagens não pode ser vazia.")
    private List<String> characters;

    @NotEmpty(message = "O catálogo deve ter pelo menos uma categoria.")
    private List<UUID> categoryIds; 

    private Float price;

    @NotNull(message = "O ano é obrigatório.")
    @Min(value = 1888, message = "O ano deve ser posterior a 1888.")
    private Integer year;

    @NotBlank(message = "A URL da imagem não pode ser vazia.")
    private String imageUrl;

    @NotNull(message = "A disponibilidade é obrigatória.")
    private Boolean isAvailable;

    @NotNull(message = "O tipo de mídia é obrigatório.")
    private MediaType mediaType;
}
