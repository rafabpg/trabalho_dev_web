interface Media {
  id: string;
  title: string;
  description: string;
  characters: string[];
  categoryIds: string[];
  year: number;
  imageUrl: string;
  isAvailable: boolean;
  mediaType: "MOVIE" | "SERIES";
}
export interface Movie extends Media {
  mediaType: "MOVIE";
  duration: number;
}
export interface Series extends Media {
  mediaType: "SERIES";
  seasons: number;
}
