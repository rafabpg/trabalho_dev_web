package com.example.trabalho_02.modules.catalog.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.trabalho_02.modules.catalog.DTO.MovieDTO;
import com.example.trabalho_02.modules.catalog.DTO.SeriesDTO;
import com.example.trabalho_02.modules.catalog.model.Movie;
import com.example.trabalho_02.modules.catalog.model.Serie;
import com.example.trabalho_02.modules.category.model.Category;
import java.util.stream.Collectors;

@Component
public class SerieMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    public SeriesDTO toDto(Serie serie) {
        SeriesDTO serieeDTO = this.modelMapper.map(serie, SeriesDTO.class);
        serieeDTO.setCategoryIds(serie.getCategory().stream()
            .map(Category::getId)
            .collect(Collectors.toList()));
            return serieeDTO;
    }

    public Serie toEntity(SeriesDTO seriesDTO) {
        return this.modelMapper.map(seriesDTO, Serie.class);
    }
}
