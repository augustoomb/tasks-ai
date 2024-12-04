import BreadCrumb from "@/components/shared/Breadcrumb";
import { fetchResponse } from "@/lib/utils";
import { Module } from "@prisma/client";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ItemModule from "@/components/modules/ItemModule";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function Settings() {
      
    const elements = [{name: "Settings", href: "/"}];

    return(
        <> 
            <BreadCrumb {...{elements}}/>

            <h1 className="text-3xl font-bold h-16">Configurações</h1>

            <div className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-4">
                    <h2 className="text-2xl font-bold">Keys</h2>
                    <p className="text-zinc-500">Insira as chaves para se conectar aos módulos</p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-xl font-bold">Open AI</h3>
                    <div className="grid w-full max-w-sm items-center gap-y-2">
                        <Label htmlFor="key">Key</Label>
                        <Input type="text" id="key" placeholder="Key" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-xl font-bold">Google Drive</h3>
                    <div className="grid w-full max-w-sm items-center gap-y-2">
                        <Label htmlFor="client-email">Client Email</Label>
                        <Input type="text" id="client-email" placeholder="Client Email" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-y-2">
                        <Label htmlFor="private-key">Private key</Label>
                        <Input type="text" id="private-key" placeholder="Private key" />
                    </div>
                </div>
                <div className="w-full max-w-sm flex flex-row place-content-between">
                    <Button variant="secondary" className="w-1/3">Cancelar</Button>
                    <Button className="w-1/3">Salvar</Button>
                </div>
            </div>

            {/* <Suspense fallback={<p>Carregando...</p>}>
                <GetSettings />
            </Suspense> */}
        </>
    )    
}

async function GetSettings() {
    // try {
    //     const session = await getServerSession(authOptions);
    //     const userId = session?.user?.id || "";

    //     const response = await fetchResponse("/module", "GET");
    //     const data = await response.json();
    //     const modules: Module[] = data.modules;

    //     return (
    //         modules
    //         .filter((module: Module) => module.status !== false)
    //         .map((module: Module) => {
    //             return (
    //                 <ItemModule key={module.id} module={module} userId={userId} />
    //             )
    //         })
    //     )
    // } catch (error) {
    //     return (
    //         <p>{JSON.stringify(error)}</p>
    //     )
    // }    
}
