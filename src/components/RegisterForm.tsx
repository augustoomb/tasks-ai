"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerFormSchema } from "@/schemas/formSchemas/registerFormSchema";
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
    const form = useForm<z.infer<typeof registerFormSchema>>({
      resolver: zodResolver(registerFormSchema),
      defaultValues: {
        name: "",
        phone: "",
        email: "",
        password: "",
      },
    })
   
    // Define a submit handler.
    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        try {
            const response: any = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
    
            if (!response?.error) {
                router.push("/home");
                router.refresh();
            }
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            console.log("Login realizado com sucesso!", response);
        } catch (error) {
            console.error("Login Falhou:", error);
        }
        
    }

    return (        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 flex flex-col self-center space-y-4">
                <Image className="xl:hidden place-self-center" src="/blacklogo.png" alt="Logo" width={100} height={100} />
                <div className="space-y-4">                                     
                    <h1 className="text-3xl font-bold md:text-left text-center ">Login</h1>
                    <p className="text-sm text-zinc-500">Insira os seus dados para entrar</p>
                </div>    
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
                <Button type="submit">Entrar</Button>
                <div className="text-xs text-center">
                    <p>Esqueci minha senha</p>
                    <p>Não possui uma conta? <span className="underline underline-offset-1">Cadastre-se</span></p>
                </div> 
            </form>
        </Form> 
    )
  }
