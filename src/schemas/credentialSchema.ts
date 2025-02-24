import { z, ZodIssue } from 'zod';

export const credentialSchema = z.object({
    userId: z.number().int({
        message: 'O userId deve ser um número inteiro',
    }),

    keyName: z
        .string({ invalid_type_error: "keyName deve ser válido" }),

    encryptedKey: z
        .string({
            required_error: "Senha é obrigatória",
            invalid_type_error: "Senha deve ser um campo de texto",
        })
});