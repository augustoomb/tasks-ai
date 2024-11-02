import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const email = searchParams.get("email") || "";

        const userPrisma = await prisma.user.findUnique(
            { 
                where: { email } ,
                include: {
                    Assistant: true
                }
            },
            
        );

        // Faz uma cópia do objeto sem a propriedade `password`
        const { password, ...user } = userPrisma || {};

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    }
}