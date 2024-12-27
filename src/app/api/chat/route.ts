import { getSpecificCellDataFromGoogleSheets } from '@/lib/sheets';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';


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
      getSpecificCellDataFromGoogleSheets,      
    },
    
    
  });

  return result.toDataStreamResponse();
}
