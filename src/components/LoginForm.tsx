"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { userSchema } from "@/schemas";
import { toast } from "sonner"
import Link from "next/link";
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const loginFormSchema = userSchema.pick({ email: true, password: true });

    // Define form.
    const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
   
    // Define a submit handler.
    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoading(true); // Inicia a barra de progresso
        setProgress(20);

        try {
            const response: any = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (response.ok) {
                setProgress(100);
                toast.success("Login efetuado com sucesso. Redirecionando para a página principal.");
                router.push("/home");
                router.refresh();
                
            } else {
                throw new Error(JSON.stringify(response));
            }

        } catch (error) {
            toast.error("Credenciais inválidas ou inexistentes. Tente novamente.");
            console.error(String(error));
            setProgress(0);
        } finally {
            setTimeout(() => {
              setIsLoading(false);
              setProgress(0);
            }, 1000);   
        }    
    }

    // Atualiza o progresso gradualmente enquanto carrega
    useEffect(() => {
        if (isLoading && progress < 100) {
            // define um temporizador que dispara após 500ms.
            // Quando o temporizador expira, ele executa uma função que atualiza o estado progress, incrementando o valor anterior (prev) em 40, mas limitando-o ao máximo de 100
            // Math.min: assegura que o valor de progress nunca exceda 100
            const timer = setTimeout(() => setProgress((prev) => Math.min(prev + 40, 100)), 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, progress]); // toda vez que isLoading ou progress mudarem

    return (        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 flex flex-col self-center space-y-4">
                <Image className="xl:hidden place-self-center" src="/blacklogo.png" alt="Logo" width={100} height={100} />
                <div className="space-y-4">                                     
                    <h1 className="text-3xl font-bold md:text-left text-center ">Login</h1>
                    <p className="text-sm text-zinc-500">Insira os seus dados para entrar</p>
                </div> 

                {/* Barra de progresso */}
                {isLoading && <Progress value={progress} className="w-full" />}

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
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                </Button>
                <div className="text-xs text-center">
                    <Link className="underline underline-offset-1" href="">Esqueci minha senha</Link>
                    <p>Não possui uma conta?&nbsp;
                        <Link href="/register">
                            <span className="underline underline-offset-1">Cadastre-se</span>                        
                        </Link>
                    </p>
                </div> 
            </form>
        </Form> 
    )
  }
