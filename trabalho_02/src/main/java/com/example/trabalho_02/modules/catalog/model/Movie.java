package com.example.trabalho_02.modules.catalog.model;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;



@Data
@Entity(name="Movie")
@DiscriminatorValue("MOVIE")
public class Movie  extends Catalog{

    @ElementCollection
    @NotEmpty(message = "A lista de personagens não pode ser vazia.")
    private List<String> characters;
}
