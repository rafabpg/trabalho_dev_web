import { z } from "zod";

export const loginSchema = z.object({
  cpf: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .regex(new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), {
      message: "CPF inválido",
    }),

  senha_hash: z.string().min(1, { message: "Campo obrigatório" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
