"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userSchema } from "@/schemas";
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import HeaderForm from "./HeaderForm";
import { CustomFormField } from "./CustomFormField";


export function RegisterForm() {
    const router = useRouter();

    // Define form.
    const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
    })
   
    // Define a submit handler.
    async function onSubmit(values: z.infer<typeof userSchema>) {
        try {
            const registerUserRoute = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`;

            const response: any = await fetch(registerUserRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                toast.success("Usuário criado com sucesso. Efetue o login.");
                router.push("/login");
                router.refresh();
                
            } else {
                const infoResponse = await response.json();
                throw new Error((infoResponse.errors[0]?.message || JSON.stringify(infoResponse)));
            }

        } catch (error) {
            toast.error(String(error));
            console.error(String(error));
        }        
    }

    return (        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 flex flex-col self-center space-y-4">
                
                <HeaderForm title="Cadastro" description="Insira os seus dados para se cadastrar"/>
                
                <CustomFormField control={form.control} name="name" label="Nome" type="text" placeholder="Fulano de Tal" description="Digite seu nome"/>
                
                <CustomFormField control={form.control} name="phone" label="Telefone" type="text" placeholder="xx xxxx xxxx" description="Digite seu telefone"/>
                
                <CustomFormField control={form.control} name="email" label="E-mail" type="email" placeholder="fulano@email.com" description="Digite seu e-mail" />

                <CustomFormField control={form.control} name="password" label="Senha" type="password" placeholder="********" description="Digite sua senha" />
                
                <Button type="submit">Cadastrar</Button>
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
