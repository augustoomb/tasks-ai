import { z, ZodIssue } from 'zod';
import { userSchema } from './userSchema';

export const moduleSchema = z.object({
    name: z
        .string({
            required_error: "Nome é obrigatório",
            invalid_type_error: "Nome deve ser um campo de texto",
        })
        .min(5, { message: "Nome deve ter mais de 1 caracteres"})
        .max(50, {message: "Nome deve ter menos de 50 caracteres"}),
    description: z
        .string({
            required_error: "Descrição é obrigatório",
            invalid_type_error: "Descrição deve ser um campo de texto",
        })
        .min(5, { message: "Descrição deve ter mais de 1 caracteres"})
        .max(50, {message: "Descrição deve ter menos de 50 caracteres"}),
    status: z
        .boolean(),
    users: z
        .array(userSchema)
        .optional()
});