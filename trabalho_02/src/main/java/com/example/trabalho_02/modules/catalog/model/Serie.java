package com.example.trabalho_02.modules.catalog.model;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
@Entity(name="Serie")
@DiscriminatorValue("SERIES")
public class Serie extends Catalog {

    @NotNull(message = "O número de temporadas é obrigatório.")
    @Min(value = 1, message = "A série deve ter pelo menos 1 temporada.")
    private Integer seasons;

}
