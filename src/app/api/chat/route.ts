import { runModules } from '@/lib/modules';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createOpenAI } from "@ai-sdk/openai";
import prisma from "@/lib/prisma";
import { decryptCredentials } from '@/lib/utils';
import { credentialSchema } from '@/schemas/credentialSchema';


const getSpecificCredentialsByUserId = async (userId: string, keyName: string) => {
  return await prisma.credential.findFirst({
    where: {
      userId: Number(userId),
      keyName: keyName,
    },
    select: {
      encryptedKey: true,
    },
  });
};


export async function POST(req: Request) {
  const { messages, arrUserEnabledModuleIds, userId } = await req.json();

  const { encryptedKey } = await getSpecificCredentialsByUserId(userId, "openai_api_key") || {};

  const decryptOpenAIKey = decryptCredentials(encryptedKey || '');

  // ver essa linha
  const openai = createOpenAI({ apiKey: decryptOpenAIKey });

  const result = streamText({
    model: openai('gpt-4o-mini'), //ver essa linha
    messages,
    maxSteps: 3,
    system: `Você é um assistente útil. Verifique sua base de conhecimento antes de responder a quaisquer perguntas.`,
    tools: runModules(arrUserEnabledModuleIds),
  });

  return result.toDataStreamResponse();
}
