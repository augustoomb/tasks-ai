'use client'

import { useChat } from 'ai/react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import clsx from 'clsx';

export default function Chatbot({ arrUserEnabledModuleIds }: { arrUserEnabledModuleIds: number[] }) {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: { arrUserEnabledModuleIds }, // Adiciona o array de números ao corpo da requisição
    });

    return (
        <div className='flex flex-col h-full my-2 rounded-lg '>
            <div className='flex flex-col flex-grow p-4 overflow-y-scroll bg-zinc-100 mb-6 rounded-md content-evenly'>
                {messages
                .filter(message => message.content?.trim() !== "")
                .map(message => (                    
                    <div 
                        className={clsx(
                            message.role === 'user' ? 'bg-zinc-300 mr-auto text-left' : 'bg-zinc-200 ml-auto text-right',
                            'm-2', 'p-2', 'rounded-md', 'text-neutral-700', 'text-sm'
                        )} key={message.id}>

                            <span className="font-bold">{message.role === 'user' ? 'User: ' : 'AI: '}</span>
                            {message.content}
                        
                    </div>
                ))}
            </div>

            <form className="flex flex-row gap-x-6" onSubmit={handleSubmit}>
                <Input className='flex-grow' name="prompt" value={input} onChange={handleInputChange} />
                <Button type="submit">Enviar</Button>
            </form>
        </div>
    );
}
