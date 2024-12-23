'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignOut from "@/components/shared/SignOut";
import { fetchResponse } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "@/lib/cookies";

export default function WithoutAssistant({ userId }: { userId: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="md:w-2/5 md:h-2/5 w-11/12 min-w-72 flex flex-col bg-white text-zinc-900 rounded-lg p-6">
            <div className="flex flex-col justify-between w-full h-full p-4 border-solid border-2 border-zinc-200 shadow-lg rounded-lg">
                <div className="flex flex-col gap-y-4">
                    <Image className="place-self-center" src={"/blacklogo.png"} alt="Logo" width={100} height={100} />
                    <div className="self-end">
                        <SignOut />
                    </div> 
                </div>
                <h2 className="text-zinc-900 text-2xl font-bold text-center">Bem Vindo</h2>
                <p className="text-zinc-900 text-lg text-center">
                    Este é o seu primeiro uso do Tasks AI.
                    Por favor clique em continuar para criar seu assistente.
                </p>   
                <Button disabled={isLoading} className="mt-4 w-2/3 self-center" onClick={() => onClick(userId, router, setIsLoading)}>Cadastrar</Button>
            </div>
        </div>
    )
}

async function onClick(userId: string, router: any, setIsLoading: any) {

    try {
        setIsLoading(true)    

        const response = await fetchResponse(`/assistant`, "POST", { userId: userId });

        if (response.ok) {
            console.log("Assistente criado com sucesso")
            const data = await response.json();

            const assistantId = data.id;

            await setCookie("assistantId", assistantId);

            router.push(`/panel/home`);
        } else {
            setIsLoading(false)
            console.log("error ao criar assistente")
        }
    } catch (error) {
        return (
            <p>{JSON.stringify(error)}</p>
        )
    }
}
