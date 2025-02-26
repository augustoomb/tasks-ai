import { runModules } from '@/lib/modules';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createOpenAI } from "@ai-sdk/openai";
import prisma from "@/lib/prisma";
// import { decryptKey } from '@/lib/utils';


const getCredentialsByUserId = async (userId: string) => {
  return await prisma.credential.findMany({
    where: {
      userId: Number(userId),
    }
  });
};


export async function POST(req: Request) {
  const { messages, arrUserEnabledModuleIds, userId } = await req.json();

  const credentials = await getCredentialsByUserId(userId);

  const openaiApiKeyCredential = credentials.find(
    (credential) => credential.keyName === "openai_api_key"
  );

  // const key = decryptKey(openaiApiKeyCredential?.encryptedKey || '');
  // console.log("KEY DESCRIPTOGRAFADA: "+key);

  // console.log(openaiApiKeyCredential?.encryptedKey);

  // ver essa linha
  const openai = createOpenAI({ apiKey: openaiApiKeyCredential?.encryptedKey });

  const result = streamText({
    model: openai('gpt-4o-mini'), //ver essa linha
    messages,
    maxSteps: 3,
    system: `Você é um assistente útil. Verifique sua base de conhecimento antes de responder a quaisquer perguntas.`,
    tools: runModules(arrUserEnabledModuleIds),
  });

  return result.toDataStreamResponse();
}
