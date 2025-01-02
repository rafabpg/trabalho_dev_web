import { z } from "zod";

export const mediaTypeEnum = z.enum(["MOVIE", "SERIES"]);

export const MediaSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  year: z.number().min(1900, "Ano inválido."),
  imageUrl: z.string().url("URL inválida."),
  isAvailable: z.literal(true),
  mediaType: mediaTypeEnum,
  price:z.number(),
  categoryIds: z.array(z.string()).min(1, "Selecione ao menos uma categoria."),
  characters: z.array(z.string()).min(1, "Insira pelo menos um personagem."),
  duration: z.number().optional(), 
  seasons: z.number().optional(),
});

export type MediaSchemaType = z.infer<typeof MediaSchema>;