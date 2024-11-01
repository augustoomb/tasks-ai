import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WithoutAssistant() {
    return (
        <div className="md:w-2/5 md:h-2/5 w-11/12 min-w-72 flex flex-col bg-white text-zinc-900 rounded-lg p-6">
            <div className="flex flex-col justify-between w-full h-full p-4 border-solid border-2 border-zinc-200 shadow-lg rounded-lg">
                <div className="flex flex-col gap-y-4">
                    <Image className="place-self-center" src={"/blacklogo.png"} alt="Logo" width={100} height={100} />
                    <h2 className="text-zinc-900 text-2xl font-bold text-center">Bem Vindo</h2>
                </div>
                <p className="text-zinc-900 text-lg text-center">
                    Este é o seu primeiro uso do Tasks AI.
                    Por favor clique em continuar para criar seu assistente.
                </p>   
                <Button className="mt-4 w-2/3 self-center">Cadastrar</Button>
            </div>
        </div>
    )
}