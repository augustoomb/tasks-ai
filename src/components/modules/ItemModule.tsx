'use client'

import { fetchResponse } from "@/lib/utils";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Module } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface ItemModuleProps {
    module: Module
    userId: string
}

export default function ItemModule(props: ItemModuleProps) {
    
    const router = useRouter();

    const { module } = props
    const { userId } = props

    const [isChecked, setChecked] = useState(false)

    const toogleSwitch = async () => {
        const response = await fetchResponse(`/users_modules/${module.id}?userId=${userId}`, "PUT", { enabled: !isChecked });
        setChecked(!isChecked)
        router.refresh();
    }

    useEffect(() => {
        const getInfo = async () => {
            const response = await fetchResponse(`/module/${module.id}?userId=${userId}`, "GET");
            const data = await response.json();
            data.modules?.users[0]?.enabled == true ? setChecked(true) : setChecked(false);
        }

        getInfo()
    }, [module.id, userId])

    return (
        <Dialog key={module.id}>
            <DialogTrigger className="w-full xl:w-1/2 ">
                <Card className="flex min-h-44 justify-between bg-zinc-900 max-w-2xl text-white p-4">
                    <CardHeader className="self-center">
                        <CardTitle className="inline-block w-fit bg-gray-600 text-xs rounded-xl px-2 py-1">Disponível</CardTitle>
                        <CardTitle className="font-semibold text-3xl text-left">{module.name}</CardTitle>
                        <CardDescription className="text-justify text-white text-sm">{module.description}</CardDescription>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Módulo está habilitado para este usuário?</DialogTitle>
                <DialogDescription>
                    <Switch checked={isChecked} onCheckedChange={toogleSwitch} />
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
