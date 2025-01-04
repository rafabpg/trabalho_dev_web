import { z } from "zod";

export const MovieSchema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
  description: z.string().nonempty("Descrição é obrigatória"),
  year: z.number().int().min(1900, "Ano deve ser maior que 1900"),
  price: z.number().nonnegative("Preço deve ser positivo"),
  imageUrl: z.string().url("URL da imagem inválida"),
  characters: z.array(z.string().nonempty()).nonempty("Adicione pelo menos um personagem"),
  duration: z.number().nonnegative("Duração deve ser positiva"),
  categoryIds: z.array(z.string().nonempty()).nonempty("Adicione pelo menos uma categoria"),
  mediaType: z.literal("MOVIE").default("MOVIE"),
  isAvailable: z.boolean().default(true),
});

export type MovieSchemaType = z.infer<typeof MovieSchema>;
