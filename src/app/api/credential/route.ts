import prisma from "@/lib/prisma";
import { credentialSchema } from "@/schemas/credentialSchema";
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { cryptCredentials } from '@/lib/utils';

export async function POST(req: Request, res: NextApiResponse) {
    try {
        // const { userId, keyName, encryptedKey } = await req.json();
        const dataCredential = await req.json();

        const validatedCredential = credentialSchema.safeParse(dataCredential);

        if (!validatedCredential.success) {
            return NextResponse.json({
                errors: validatedCredential.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { userId, keyName, apiKey } = validatedCredential.data;

        const encryptedKey = await cryptCredentials(apiKey);

        await prisma.credential.upsert({
            where: {                
                userId_keyName: { userId, keyName }
            },
            update: {
                encryptedKey: encryptedKey
            },
            create: {
                userId,
                keyName,
                encryptedKey: encryptedKey,
            }
        });

        return NextResponse.json({ message: 'Credencial atualizada com sucesso' }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}