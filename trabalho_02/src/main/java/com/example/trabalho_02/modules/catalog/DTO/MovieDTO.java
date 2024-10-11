package com.example.trabalho_02.modules.catalog.DTO;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class MovieDTO extends CatalogDTO {

    @NotEmpty(message = "A lista de personagens não pode ser vazia.")
    private List<String> characters;
}