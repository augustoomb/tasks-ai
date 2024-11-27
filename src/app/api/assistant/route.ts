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
          "Você é um assistant especializado em entender as necessidades do usuário, entender os parâmetros e passá-los corretamente para as functions definidas no 'tools'",
        // name: "Assistente 003",
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

}