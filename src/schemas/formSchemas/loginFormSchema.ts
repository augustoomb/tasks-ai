import { z } from "zod"

export const loginFormSchema = z.object({    
    email: z
        .string()
        .min(1, { message: "E-mail é obrigatório" })
        .email({ message: "E-mail inválido" }),
    password: z
        .string()
        .min(6, { message: "Senha é obrigatória, com pelo menos 6 caracteres" })
        .max(12, { message: "Senha muito longa" }),
});