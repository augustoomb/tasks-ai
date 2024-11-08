'use client'

import { ArrowUp, ArrowRight, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function AssistantItem({assistantId}: {assistantId: string}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await setCookie("assistantId", assistantId);
      router.push(`/panel/home`);
    } catch (error) {
      console.error("Erro ao definir cookie:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>{ assistantId ? "Assistente" : "Vazio" }</CardTitle>
        <CardDescription>{assistantId || 0}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4 self-center">
          {
            assistantId ? (
              <ArrowUp color="rgb(22 163 74)"/>
            ) : (
              <ArrowDown color="rgb(220 38 38)"/>
            )
          }
          
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              { assistantId ? "Assistente on-line" : "Assistente off-line" }
            </p>
            <p className="text-sm text-muted-foreground">
              01/11/2024
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!assistantId || loading} onClick={handleClick}>
          {loading ? "Carregando..." : <><ArrowRight /> Entrar</>}
        </Button>
      </CardFooter>
    </Card>
  )
}
