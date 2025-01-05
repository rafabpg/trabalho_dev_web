import { create } from "zustand";
import { Series } from "../shared/CatalogInterface";

interface SeriesStore {
  pagina: number;
  tamanho: number;
  nome: string;
  serieSelecionada: Series | null;
  deletingId: string | null;
  series: Series[];
  filteredSeries: Series[];
  sortField: keyof Series | null; 
  sortOrder: "asc" | "desc" | null;

  setPagina: (pagina: number) => void;
  setTamanho: (tamanho: number) => void;
  setNome: (nome: string) => void;
  setSerieSelecionada: (serie: Series) => void;
  setDeletingId: (id: string | null) => void;
  setSeries: (series: Series[]) => void;
  filterSeries: (nome: string) => void;
  setSort: (field: keyof Series) => void;
}

export const useSeriesStore = create<SeriesStore>((set) => ({
  pagina: 0,
  tamanho: 2,
  nome: "",
  serieSelecionada: null,
  deletingId: null,
  series: [],
  filteredSeries: [],
  sortField: null,
  sortOrder: null,

  setPagina: (novaPagina: number) => set({ pagina: novaPagina }),
  setTamanho: (novoTamanho: number) => set({ tamanho: novoTamanho }),
  setNome: (novoNome: string) => {
    set({ nome: novoNome });
    set((state) => ({
      filteredSeries: state.series.filter((serie) =>
        serie.title.toLowerCase().includes(novoNome.toLowerCase())
      ),
    }));
    set({ pagina: 0 });
  },
  setSerieSelecionada: (novaSerieSelecionada: Series) =>
    set({ serieSelecionada: novaSerieSelecionada }),
  setDeletingId: (id: string | null) => set({ deletingId: id }),
  setSeries: (series: Series[]) =>
    set({ series, filteredSeries: series }),
  filterSeries: (nome: string) =>
    set((state) => ({
      filteredSeries: state.series.filter((serie) =>
        serie.title.toLowerCase().includes(nome.toLowerCase())
      ),
    })),
  setSort: (field: keyof Series) =>
    set((state) => {
      const isSameField = state.sortField === field;
      const newOrder = isSameField && state.sortOrder === "asc" ? "desc" : "asc";

      const sortedSeries = [...state.filteredSeries].sort((a, b) => {
        const valueA = a[field];
        const valueB = b[field];

        if (valueA < valueB) return newOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return newOrder === "asc" ? 1 : -1;
        return 0;
      });

      return {
        sortField: field,
        sortOrder: newOrder,
        filteredSeries: sortedSeries,
      };
    }),
}));
