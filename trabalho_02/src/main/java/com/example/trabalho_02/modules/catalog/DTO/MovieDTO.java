package com.example.trabalho_02.modules.catalog.DTO;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MovieDTO extends CatalogDTO {

    @NotNull(message = "A duração é obrigatória.")
    @Min(value = 1, message = "A duração deve ser maior que 0.")
    private Integer duration;
}