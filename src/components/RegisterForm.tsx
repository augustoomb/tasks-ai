"use client"

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userSchema } from "@/schemas";
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import HeaderForm from "./HeaderForm";
import { CustomFormField } from "./CustomFormField";
import { fetchResponse } from "@/lib/utils";
import { useState, useEffect } from "react";
import LoadingProgressBar from "./LoadingProgressBar";

export function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);    

    const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
    })
   
    async function onSubmit(values: z.infer<typeof userSchema>) {
        setIsLoading(true); // Inicia a barra de progresso
        setProgress(20);

        try {
            const response = await fetchResponse("/auth/register", "POST", values);

            if (response.ok) {
                setProgress(100);
                toast.success("Usuário criado com sucesso. Efetue o login.");
                router.push("/login");
                router.refresh();
                
            } else {
                setProgress(0);
                const infoResponse = await response.json();
                throw new Error((infoResponse.errors[0]?.message || JSON.stringify(infoResponse)));
            }

        } catch (error) {
            setProgress(0);
            toast.error(String(error));
            console.error(String(error));
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
            }, 1000);
        }  
    }

    useEffect(() => {
        if (isLoading && progress < 100) {            
            const timer = setTimeout(() => setProgress((prev) => Math.min(prev + 40, 100)), 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, progress]); // toda vez que isLoading ou progress mudarem

    return (        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 flex flex-col self-center space-y-4">
                
                <HeaderForm title="Cadastro" description="Insira os seus dados para se cadastrar"/>

                <LoadingProgressBar isLoading={isLoading} progress={progress} />
                
                <CustomFormField control={form.control} name="name" label="Nome" type="text" placeholder="Fulano de Tal" description="Digite seu nome"/>
                
                <CustomFormField control={form.control} name="phone" label="Telefone" type="text" placeholder="xx xxxx xxxx" description="Digite seu telefone"/>
                
                <CustomFormField control={form.control} name="email" label="E-mail" type="email" placeholder="fulano@email.com" description="Digite seu e-mail" />

                <CustomFormField control={form.control} name="password" label="Senha" type="password" placeholder="********" description="Digite sua senha" />
                
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>

                <div className="text-xs text-center">
                    <p>Já possui uma conta?&nbsp;
                        <Link href="/login">
                            <span className="underline underline-offset-1">Entre</span>
                        </Link>
                    </p>
                </div> 
            </form>
        </Form> 
    )
  }
