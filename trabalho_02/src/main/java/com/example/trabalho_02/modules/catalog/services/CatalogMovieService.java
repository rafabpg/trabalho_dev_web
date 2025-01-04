package com.example.trabalho_02.modules.catalog.services;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.trabalho_02.modules.catalog.DTO.MovieDTO;
import com.example.trabalho_02.modules.catalog.mapper.MovieMapper;
import com.example.trabalho_02.modules.catalog.model.Movie;
import com.example.trabalho_02.modules.catalog.repository.CatalogRepository;
import com.example.trabalho_02.modules.category.model.Category;
import com.example.trabalho_02.modules.category.repository.CategoryRepository;

@Service
public class CatalogMovieService {

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MovieMapper movieMapper;

    public MovieDTO createMovie(MovieDTO movieDto){
        List<Category> categories = this.categoryRepository.findAllById(movieDto.getCategoryIds());
    
        if (categories.size() != movieDto.getCategoryIds().size()) {
            throw new RuntimeException("Algumas categorias não existem.");
        }
        
        Movie movie = this.movieMapper.toEntity(movieDto);
        movie.setCategory(categories);  
        Movie savedMovie = this.catalogRepository.save(movie);
        return movieMapper.toDto(savedMovie);
    }

    public Page<MovieDTO> getMoviesWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Movie> moviePage = this.catalogRepository.findAllMovies(pageable);

        return moviePage.map(movie -> movieMapper.toDto(movie));
    }


    public MovieDTO getById(UUID id){
        var result = this.catalogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Filme não encontrado"));
        return result instanceof Movie ? movieMapper.toDto((Movie) result) : null;
    }

    public void deleteMovie(UUID id) {
        var result = this.catalogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Filme não encontrado"));
        catalogRepository.delete(result);
    }

    public MovieDTO updateMovie(UUID id, MovieDTO movieDto) {
        var existingMovie = this.catalogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Filme não encontrado"));
        if (!(existingMovie instanceof Movie)) {
            throw new RuntimeException("O item encontrado não é um filme.");
        }
        Movie movie = (Movie) existingMovie;
        movie.setTitle(movieDto.getTitle());
        movie.setDescription(movieDto.getDescription());
        movie.setDuration(movieDto.getDuration());
        movie.setYear(movieDto.getYear());
        movie.setImageUrl(movieDto.getImageUrl());
        movie.setCharacters(movieDto.getCharacters());
        movie.setIsAvailable(movieDto.getIsAvailable());

        List<Category> categories = this.categoryRepository.findAllById(movieDto.getCategoryIds());
        if (categories.size() != movieDto.getCategoryIds().size()) {
            throw new RuntimeException("Algumas categorias não existem.");
        }
        existingMovie.setCategory(categories);
    
        
        Movie updatedMovie = this.catalogRepository.save(movie);
    

        return movieMapper.toDto(updatedMovie);
    }

}
