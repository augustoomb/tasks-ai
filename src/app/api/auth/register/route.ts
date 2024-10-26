import { z, ZodIssue } from 'zod';
import prisma from '@/lib/prisma';
import { User, Prisma } from "@prisma/client";
import { NextResponse } from 'next/server';
import { cryptPass } from '@/lib/utils';
import { userSchema } from '@/schemas';

export async function POST(req: Request) {
    try {
        const { name, phone, email, password } = await req.json();
        const validatedUser = userSchema.safeParse({ name, phone, email, password });

        if(!validatedUser.success) {
            return NextResponse.json(
                {
                    errors: validatedUser.error.issues.map((issue: ZodIssue) => {
                        return {
                            field: issue.path[0],
                            message: issue.message
                        }
                    }),
                },
                { status: 400 }
            );
        }

        const hashedPass = await cryptPass(password);

        await prisma.user.create({
            data: { name, phone, email, password: hashedPass }
        })

        return NextResponse.json({ success: 'Cliente criado com sucesso' }, { status: 201 });

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                // return NextResponse.json({ error: 'E-mail já existe' }, { status: 409 });
                return NextResponse.json({
                    "errors": [
                        {
                            "field": "email",
                            "message": "E-mail já existe"
                        }
                    ]
                }, { status: 409 });
            }
            return NextResponse.json({ error: e }, { status: 500 });
        }
        return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
    }
}