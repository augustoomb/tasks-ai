import BreadCrumb from "@/components/shared/Breadcrumb";
import { fetchResponse } from "@/lib/utils";
import { Module } from "@prisma/client";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ItemModule from "@/components/modules/ItemModule";

export default async function Modules() {
      
    const elements = [{name: "Modules", href: "/"}];

    return(
        <> 
            <BreadCrumb {...{elements}}/>

            <h1 className="text-3xl font-bold h-16">Modules</h1>

            <Suspense fallback={<p>Carregando...</p>}>
                <GetModules />
            </Suspense>
        </>
    )    
}

async function GetModules() {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id || "";

        const response = await fetchResponse("/module", "GET");
        const data = await response.json();
        const modules: Module[] = data.modules;

        return (
            modules
            .filter((module: Module) => module.status !== false)
            .map((module: Module) => {
                return (
                    <ItemModule key={module.id} module={module} userId={userId} />
                )
            })
        )
    } catch (error) {
        return (
            <p>{JSON.stringify(error)}</p>
        )
    }    
}
