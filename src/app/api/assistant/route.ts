import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-ttLH4WFMh7qybBaIoJW6kj9y",
    project: process.env.OPENAI_API_PROJECT_ID,
});

const createAssistant = async () => {

    const myAssistant = await openai.beta.assistants.create({
        instructions:
          "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
        name: "Assistente 003",
        // tools: [{ type: "code_interpreter" }],
        model: "gpt-4o-mini",
    });

    return myAssistant.id;
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { userId } = data;

        const id = await createAssistant(); // CRIANDO ASSISTENTE NA OPENAI

        await prisma.assistant.create({
            data: {
                id: id,
                ownerId: userId,
            }
        });
        return NextResponse.json({ id: id }, { status: 201 });
    } catch (error) {
        console.log(JSON.stringify(error));
        
        return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    }


    // try {
    //     const {searchParams} = new URL(req.url);
    //     const email = searchParams.get("email") || "";

    //     const userPrisma = await prisma.user.findUnique(
    //         { 
    //             where: { email } ,
    //             include: {
    //                 Assistant: true
    //             }
    //         },
            
    //     );

    //     // Faz uma cópia do objeto sem a propriedade `password`
    //     const { password, ...user } = userPrisma || {};

    //     return NextResponse.json({ user }, { status: 200 });
    // } catch (error) {
    //     return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
    // }
}