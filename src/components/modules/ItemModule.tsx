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
            <DialogTrigger>
                <Card className="flex justify-between bg-zinc-900 text-white w-96">
                    <CardHeader>
                        <CardTitle>ID: {module.id} <br />Nome: {module.name}</CardTitle>
                        <CardDescription className="text-justify">{module.description}</CardDescription>
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
