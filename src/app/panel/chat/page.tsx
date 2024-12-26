import BreadCrumb from "@/components/shared/Breadcrumb";
import Chatbot from "@/components/chat/chatbot";
import { getServerSession } from "next-auth";
import { fetchResponse } from "@/lib/utils";
import { Module } from "@prisma/client";
import { Suspense } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Chat() {
      
    const elements = [{name: "Chat", href: "/"}];

    return(
        <div className="flex flex-col h-full"> 
            <BreadCrumb {...{elements}}/>

            <h1 className="text-3xl font-bold h-16">Chat</h1>

            <Suspense fallback={<p>Carregando...</p>}>
                <GetModules />
                {/* <Chatbot /> */}
            </Suspense>
        </div>
    )    
}

async function GetModules() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id || "";

        const response = await fetchResponse("/module", "GET");
        const data = await response.json();
        const modules = data.modules;

        const arrUserEnabledModuleIds = modules
            .filter((module: any) => {
                return module.status !== false
            })

            .filter((module: any) => {

                return module.users.some((userItem: any) => {
                    return userItem.userId === Number(userId) && userItem.enabled === true
                })
            })
            .map((module: any) => module.id)

        return (
            <Chatbot arrUserEnabledModuleIds={arrUserEnabledModuleIds} />
        )

        // return (
        //     modules
        //     .filter((module: Module) => module.status !== false)
        //     .map((module: Module) => {
        //         return (
        //             <ItemModule key={module.id} module={module} userId={userId} />
        //         )
        //     })
        // )
    } catch (error) {
        console.log(JSON.stringify(error));
        return (
            <p>{JSON.stringify(error)}</p>
        )
    }    
}

// CHAMAR NA API PARA PEGAR QUAIS MÓDULOS ESTÃO ATIVOS. 
// PASSAR PARA O COMPONENTE CHATBOT
