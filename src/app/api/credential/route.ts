import prisma from "@/lib/prisma";
import { credentialSchema } from "@/schemas/credentialSchema";
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

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

        const { userId, keyName, encryptedKey } = validatedCredential.data;

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
                encryptedKey
            }
        });




        return NextResponse.json({ message: 'Credencial criada com sucesso' });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}