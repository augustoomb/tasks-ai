import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const id = Number(searchParams.get("id")) || 0;

        const userPrisma = await prisma.user.findUnique(
            { 
                where: { id },
            },
            
        );

        // Faz uma cópia do objeto sem a propriedade `password`
        const { password, ...user } = userPrisma || {};

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    }
}