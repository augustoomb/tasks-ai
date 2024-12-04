import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // id do módulo vem via URL

        const {searchParams} = new URL(req.url);
        const userId = Number(searchParams.get("userId")) || 0;

        const { enabled } = await req.json();


        const modules = await prisma.users_Modules.upsert({
            where: {
                userId_moduleId: {
                    userId: userId,
                    moduleId: Number(id)
                }
            },
            update: {
                enabled: enabled
            },
            create: {
                userId: userId,
                moduleId: Number(id),
                enabled: enabled
            }
        });
        return NextResponse.json({ modules }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    }
}