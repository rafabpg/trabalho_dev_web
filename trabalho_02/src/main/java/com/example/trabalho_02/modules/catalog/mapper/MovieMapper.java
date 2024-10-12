package com.example.trabalho_02.modules.catalog.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

import com.example.trabalho_02.modules.catalog.DTO.MovieDTO;
import com.example.trabalho_02.modules.catalog.model.Movie;
import com.example.trabalho_02.modules.category.model.Category;

@Component
public class MovieMapper {

    @Autowired
    private ModelMapper modelMapper;

    public MovieDTO toDto(Movie movie) {
        MovieDTO movieDTO = this.modelMapper.map(movie, MovieDTO.class);
          movieDTO.setCategoryIds(movie.getCategory().stream()
            .map(Category::getId)
            .collect(Collectors.toList()));
            return movieDTO;
    }

    public Movie toEntity(MovieDTO movieDTO) {
        return this.modelMapper.map(movieDTO, Movie.class);
    }

}
