import { z } from "zod"

export const registerFormSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Nome é obrigatório" }),
    phone: z
        .string()
        .regex(/^[0-9]+$/, { message: "Telefone inválido" })
        .optional(),
    email: z
        .string()
        .min(1, { message: "E-mail é obrigatório" })
        .email({ message: "E-mail inválido" }),
    password: z
        .string()
        .min(6, { message: "Senha é obrigatória, com pelo menos 6 caracteres" })
        .max(12, { message: "Senha muito longa" }),
});