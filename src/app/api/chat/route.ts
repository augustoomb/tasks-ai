import { testeGetGoogleSheetData } from '@/lib/sheets';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
// import { testeGetGoogleSheetData } from '../sheets/route';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds

export async function POST(req: Request) {
  const { messages, arrUserEnabledModuleIds } = await req.json();

  console.log("arrUserEnabledModuleIds: "+arrUserEnabledModuleIds);

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    maxSteps: 3,
    system: `Você é um assistente útil. Verifique sua base de conhecimento antes de responder a quaisquer perguntas.
`,
    
    tools: {
      getInformation: tool({
        description: 'o usuário informará uma célula de planilha (ex: A4) e você fornecerá o conteúdo dessa célula',
        parameters: z.object({
          requestedCell: z.string().describe('Celula inicial'),
        }),
        execute: async ({ requestedCell }) => testeGetGoogleSheetData(requestedCell)
      }),
    },
  });

  return result.toDataStreamResponse();
}

// Qual o menor valor da planilha, levando em conta as células A2 até A6