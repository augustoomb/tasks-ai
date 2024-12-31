import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // id do módulo vem via URL

        const {searchParams} = new URL(req.url);
        const userId = Number(searchParams.get("userId")) || 0;


        const modules = await prisma.module.findUnique({
            where: {
                id: Number(id),
                users: {
                    some: {
                        user: {
                            id: userId
                        }
                    }
                }
            },
            include: {
                users: true
            }
        });
        return NextResponse.json({ modules }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    }
}

