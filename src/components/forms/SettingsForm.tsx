'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fetchResponse } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function SettingsForm(props: {userId: string}) {    

    const inputHandleBlur = async (e: HTMLInputElement) => {

        const response = await fetchResponse("/credential", "POST", {
            userId: Number(props.userId),
            keyName: e.id,
            apiKey: e.value
        });

        if (response.status === 200) {
            toast.success("Campo atualizado com sucesso");
            console.log("Campo atualizado com sucesso");
            e.value = "";
        } else {
            toast.error("Erro ao atualizar campo");
            console.log("Erro ao atualizar campo")
        }       
        
        // console.log(response)
    }
    const selectHandleBlur = async (e: React.FocusEvent<HTMLElement>) => {

        const response = await fetchResponse("/credential", "POST", {
            userId: Number(props.userId),
            keyName: e.target.id,
            apiKey: e.target.textContent
        });

        if (response.status === 200) {
            toast.success("Campo atualizado com sucesso");
            console.log("Campo atualizado com sucesso");
        } else {
            toast.error("Erro ao atualizar campo");
            console.log("Erro ao atualizar campo")
        }  
    }

    return (
        <div className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-4">
                <h2 className="text-2xl font-bold">Keys</h2>
                <p className="text-zinc-500">Insira as chaves para se conectar aos módulos</p>
            </div>
            <div className="flex flex-col gap-y-4">
                <h3 className="text-xl font-bold">Open AI</h3>
                <div className="grid w-full max-w-sm items-center gap-y-2">
                    <Label htmlFor="model">Modelos</Label>
                    <Select defaultValue="gpt-4o-mini">
                        <SelectTrigger id="openai_model" onBlur={(e) => selectHandleBlur(e)}>
                            <SelectValue placeholder="Modelos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-2">
                    <Label htmlFor="openai_api_key">Key</Label>
                    <Input type="text" id="openai_api_key" placeholder="Key" onBlur={(e) => e.target.value.trim() ? inputHandleBlur(e.target) : null} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-2">
                    <Label htmlFor="openai_project_id">Project ID</Label>
                    <Input type="text" id="openai_project_id" placeholder="Project ID" onBlur={(e) => e.target.value.trim() ? inputHandleBlur(e.target) : null} />
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <h3 className="text-xl font-bold">Google Drive</h3>
                <div className="grid w-full max-w-sm items-center gap-y-2">
                    <Label htmlFor="google_drive_client_email">Client Email</Label>
                    <Input type="text" id="google_drive_client_email" placeholder="Client Email" onBlur={(e) => e.target.value.trim() ? inputHandleBlur(e.target) : null} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-2">
                    <Label htmlFor="google_drive_private_key">Private key</Label>
                    <Input type="text" id="google_drive_private_key" placeholder="Private key" onBlur={(e) => e.target.value.trim() ? inputHandleBlur(e.target) : null} />
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <h3 className="text-xl font-bold">Send Grid (e-mails)</h3>
                <div className="grid w-full max-w-sm items-center gap-y-2">
                    <Label htmlFor="send_grid_api_key">API Key</Label>
                    <Input type="text" id="send_grid_api_key" placeholder="API Key" onBlur={(e) => e.target.value.trim() ? inputHandleBlur(e.target) : null} />
                </div>
            </div>
        </div>
    )
}
