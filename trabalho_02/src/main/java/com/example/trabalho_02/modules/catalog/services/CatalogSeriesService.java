package com.example.trabalho_02.modules.catalog.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.List;
import com.example.trabalho_02.modules.catalog.DTO.SeriesDTO;
import com.example.trabalho_02.modules.catalog.mapper.SerieMapper;
import com.example.trabalho_02.modules.catalog.model.Serie;
import com.example.trabalho_02.modules.catalog.repository.CatalogRepository;
import com.example.trabalho_02.modules.category.model.Category;
import com.example.trabalho_02.modules.category.repository.CategoryRepository;

@Service
public class CatalogSeriesService {

    @Autowired
    private CatalogRepository catalogRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SerieMapper seriesMapper;

    public SeriesDTO createSerie(SeriesDTO serieDto){
        List<Category> categories = this.categoryRepository.findAllById(serieDto.getCategoryIds());
    
        if (categories.size() != serieDto.getCategoryIds().size()) {
            throw new RuntimeException("Algumas categorias não existem.");
        }
        
        Serie serie = this.seriesMapper.toEntity(serieDto);
        serie.setCategory(categories);  
        Serie savedSerie = this.catalogRepository.save(serie);
        return seriesMapper.toDto(savedSerie);
    }

    public Page<SeriesDTO> getSeriesWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Serie> seriePage = this.catalogRepository.findAllSeries(pageable);

        return seriePage.map(serie -> seriesMapper.toDto(serie));
    }

    public void deleteSerie(UUID id) {
        var result = this.catalogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serie não encontrada"));
        catalogRepository.delete(result);
    }

    public SeriesDTO updateSerie(UUID id, SeriesDTO serieDto) {
        var existingSerie = this.catalogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serie não encontrada"));
        if (!(existingSerie instanceof Serie)) {
            throw new RuntimeException("O item encontrado não é uma serie.");
        }
        Serie serie = (Serie) existingSerie;
        serie.setTitle(serieDto.getTitle());
        serie.setDescription(serieDto.getDescription());
        serie.setSeasons(serieDto.getSeasons());
        serie.setYear(serieDto.getYear());
        serie.setImageUrl(serieDto.getImageUrl());
        serie.setCharacters(serieDto.getCharacters());
        serie.setIsAvailable(serieDto.getIsAvailable());

        List<Category> categories = this.categoryRepository.findAllById(serieDto.getCategoryIds());
        if (categories.size() != serieDto.getCategoryIds().size()) {
            throw new RuntimeException("Algumas categorias não existem.");
        }
        existingSerie.setCategory(categories);
    
        
        Serie updatedMovie = this.catalogRepository.save(serie);
    

        return this.seriesMapper.toDto(updatedMovie);
    }
}
