import { z, ZodIssue } from 'zod';

export const credentialSchema = z.object({
    userId: z.number().int({
        message: 'O userId deve ser um número inteiro',
    }),

    keyName: z
        .string({ invalid_type_error: "keyName deve ser válido" }),

    apiKey: z
        .string({
            required_error: "apiKey é obrigatória",
            invalid_type_error: "apiKey deve ser um campo de texto",
        }),
    // moduleId: z.number().int({
    //     message: 'O moduleId deve ser um número inteiro',
    // }),
    
});