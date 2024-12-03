import { ZodIssue } from 'zod';
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { moduleSchema } from "@/schemas/moduleSchema";

export async function POST(req: Request) {
    try {
        const { name, description, status } = await req.json();
        const validatedModule = moduleSchema.safeParse({ name, description, status });

        if(!validatedModule.success) {
            return NextResponse.json(
                {
                    errors: validatedModule.error.issues.map((issue: ZodIssue) => {
                        return {
                            field: issue.path[0],
                            message: issue.message
                        }
                    }),
                },
                { status: 400 }
            );
        }

        await prisma.module.create({
            data: {
                name, description, status,
                users: {
                    create: []
                }
            }
        });
        return NextResponse.json({ success: 'Módulo criado com sucesso' }, { status: 201 });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return NextResponse.json({
                    "errors": [
                        {
                            "field": "name",
                            "message": "Nome do módulo já foi utilizado"
                        }
                    ]
                }, { status: 409 });
            }
            return NextResponse.json({ error: e }, { status: 500 });
        }
        return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const modules = await prisma.module.findMany({
            include: {
                users: true
            }
        });
        return NextResponse.json({ modules }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    }
}

