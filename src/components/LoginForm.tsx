"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

const formSchema = z.object({    
    email: z
        .string()
        .min(1, { message: "E-mail é obrigatório" })
        .email({ message: "E-mail inválido" }),
    password: z
        .string()
        .min(6, { message: "Senha é obrigatória, com pelo menos 6 caracteres" })
        .max(12, { message: "Senha muito longa" }),
});

export function LoginForm() {
    // Define form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
   
    // Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
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
