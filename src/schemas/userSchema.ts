import { z, ZodIssue } from 'zod';

export const userSchema = z.object({
    name: z
        .string({
            required_error: "Nome é obrigatório",
            invalid_type_error: "Nome deve ser um campo de texto",
        })
        .min(5, { message: "Nome deve ter mais de 5 caracteres"})
        .max(50, {message: "Nome deve ter menos de 50 caracteres"}),
    phone: z
        .string({ invalid_type_error: "Telefone deve ser um campo de texto" })
        .length(11, {message: "Telefone deve ter 11 caracteres"})
        .optional(),
    email: z
        .string({
            required_error: "E-mail é obrigatório",
            invalid_type_error: "E-mail deve ser um campo de texto",
        })
        .min(3, { message: "E-mail deve ter pelo menos 3 caracteres" })
        .email({ message: "E-mail inválido" }),
    password: z
        .string({
            required_error: "Senha é obrigatória",
            invalid_type_error: "Senha deve ser um campo de texto",
        })
        .min(6, { message: "Senha deve ter pelo menos 6 caracteres"})
        .max(12, { message: "Senha muito longa" }),
});