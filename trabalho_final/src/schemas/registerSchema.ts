import { z } from "zod";

const phoneRegex = new RegExp(
  /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/
);

export const cadastroSchema = z.object({
  nome: z.string().min(1, { message: "Campo obrigatório" }),

  email: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .email({ message: "E-mail inválido" }),

  cpf: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .regex(new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), {
      message: "CPF inválido",
    }).transform((val) => val.replace(/[^\d]/g, "")),

  telefone: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .regex(phoneRegex, { message: "Telefone inválido" })
    .transform((val) => val.replace(/[^\d]/g, "")),

  senha_hash: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" }),
});

export type CadastroSchemaType = z.infer<typeof cadastroSchema>;
