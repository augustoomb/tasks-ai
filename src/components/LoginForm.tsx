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
        try {
            const response: any = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (response.ok) {
                toast.success("Login efetuado com sucesso. Redirecionando para a página principal.");
                router.push("/home");
                router.refresh();
                
            } else {
                const infoResponse = await response.json();
                throw new Error(JSON.stringify(infoResponse));
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
