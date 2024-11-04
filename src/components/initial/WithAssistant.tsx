

import Image from "next/image";
import { AssistantItem } from "./AssistantItem";
import SignOut from "@/components/shared/SignOut";

export default function WithAssistant({assistantsIds}: {assistantsIds: string[]}) {
    return (
        <div>
            <div className="flex flex-col justify-between w-full h-full p-4 border-solid border-2 border-zinc-200 shadow-lg rounded-lg">
                <div className="flex flex-col gap-y-4">
                    <Image className="place-self-center" src={"/blacklogo.png"} alt="Logo" width={100} height={100} />
                    <div className="self-end">
                        <SignOut />
                    </div>                    
                </div>
                <h2 className="text-zinc-900 text-2xl font-bold text-center">Seja bem vindo de volta</h2>
                <div className="flex flex-col gap-y-6 ">
                    <p className="text-zinc-900 text-base text-center">Lista de Assistentes Cadastrados:</p>
                    <div className="flex flex-row flex-wrap gap-4 justify-center">
                        <AssistantItem assistantId={assistantsIds[0]}/>
                        <AssistantItem assistantId={assistantsIds[1] || ""}/>
                    </div>  
                </div>
            </div>
        </div>
    )
}