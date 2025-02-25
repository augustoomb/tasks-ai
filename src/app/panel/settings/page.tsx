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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SettingsForm } from "@/components/forms/SettingsForm";

export default async function Settings() {
      
    const elements = [{name: "Settings", href: "/"}];

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || "";    

    return(
        <> 
            <BreadCrumb {...{elements}}/>

            <h1 className="text-3xl font-bold h-16">Configurações</h1>

            <SettingsForm userId={userId} />           
            

            {/* <Suspense fallback={<p>Carregando...</p>}>
                <GetSettings />
            </Suspense> */}
        </>
    )    
}

async function GetSettings() {
    // try {
        // const session = await getServerSession(authOptions);
        // const userId = session?.user?.id || "";

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
