import { runModules } from '@/lib/modules';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';


export async function POST(req: Request) {
  const { messages, arrUserEnabledModuleIds } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    maxSteps: 3,
    system: `Você é um assistente útil. Verifique sua base de conhecimento antes de responder a quaisquer perguntas.`,
    tools: runModules(arrUserEnabledModuleIds),
  });

  return result.toDataStreamResponse();
}
