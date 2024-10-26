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
                <Image className="xl:hidden place-self-center" src="/blacklogo.png" alt="Logo" width={100} height={100} />
                <div className="space-y-4">                                     
                    <h1 className="text-3xl font-bold md:text-left text-center ">Cadastro</h1>
                    <p className="text-sm text-zinc-500">Insira os seus dados para se cadastrar</p>
                </div>    
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Fulano de Tal" {...field} />
                            </FormControl>
                            <FormDescription>
                                Digite seu nome
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}                    
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone(opcional)</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="xx xxxx xxxx" {...field} />
                            </FormControl>
                            <FormDescription>
                                Digite seu telefone
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}                    
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="fulano@email.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                Digite seu e-mail
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}                    
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormDescription>
                                Digite sua senha(min. 6 caracteres, max. 12)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}                    
                />
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
