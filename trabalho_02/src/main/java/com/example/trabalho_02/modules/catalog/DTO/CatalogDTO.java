package com.example.trabalho_02.modules.catalog.DTO;

import java.util.List;
import java.util.UUID;

import com.example.trabalho_02.modules.catalog.model.MediaType;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CatalogDTO {

    @NotBlank(message = "O título não pode ser vazio.")
    @Size(min = 1, max = 100, message = "O título deve ter entre 1 e 100 caracteres.")
    private String title;

    @Size(max = 500, message = "A descrição deve ter no máximo 500 caracteres.")
    private String description;

    @NotNull(message = "A duração é obrigatória.")
    @Min(value = 1, message = "A duração deve ser maior que 0.")
    private Integer duration;

    @NotEmpty(message = "O catálogo deve ter pelo menos uma categoria.")
    private List<UUID> categoryIds; // IDs de categorias no lugar de objetos Category

    @NotNull(message = "O ano é obrigatório.")
    @Min(value = 1888, message = "O ano deve ser posterior a 1888.")
    private Integer year;

    @NotBlank(message = "A URL da imagem não pode ser vazia.")
    @Size(max = 255, message = "A URL da imagem deve ter no máximo 255 caracteres.")
    private String imageUrl;

    @NotNull(message = "A disponibilidade é obrigatória.")
    private Boolean isAvailable;

    @NotNull(message = "O tipo de mídia é obrigatório.")
    private MediaType mediaType;
}
