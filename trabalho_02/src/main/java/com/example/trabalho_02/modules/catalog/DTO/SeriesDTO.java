package com.example.trabalho_02.modules.catalog.DTO;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SeriesDTO extends CatalogDTO {

    @NotNull(message = "O número de temporadas é obrigatório.")
    @Min(value = 1, message = "A série deve ter pelo menos 1 temporada.")
    private Integer seasons;
    
}
