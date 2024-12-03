"use client"

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { loginFormSchema } from "@/schemas/forms/loginFormSchema";
import { toast } from "sonner";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./CustomFormField";
import LoadingProgressBar from "./LoadingProgressBar";
import HeaderForm from "./HeaderForm";
import { loginUser } from "@/lib/loginUser";

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);    

    const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
   
    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoading(true); // Inicia a barra de progresso
        setProgress(20);

        try {
            const result = await loginUser(values);

            if (result.success) {
                setProgress(100);
                toast.success("Login efetuado com sucesso. Redirecionando para a página principal.");
                
                router.push("/initial");
            } else {
                throw new Error(result.message);
            }
            
        } catch (error) {
            toast.error(String(error));
        } finally {
            setIsLoading(false);
            setProgress(0);
        }
    }

    // Atualiza o progresso gradualmente enquanto carrega
    // define um temporizador que dispara após 500ms.
    // Quando o temporizador expira, ele executa uma função que atualiza o estado progress, incrementando o valor anterior (prev) em 40, mas limitando-o ao máximo de 100
    // Math.min: assegura que o valor de progress nunca exceda 100
    useEffect(() => {
        if (isLoading && progress < 100) {            
            const timer = setTimeout(() => setProgress((prev) => Math.min(prev + 40, 100)), 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, progress]); // toda vez que isLoading ou progress mudarem

    return (        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-1/2 flex flex-col self-center space-y-4">

                <HeaderForm title="Login" description="Insira os seus dados para entrar"/>

                <LoadingProgressBar isLoading={isLoading} progress={progress} />

                <CustomFormField control={form.control} name="email" label="E-mail" type="email" placeholder="fulano@email.com" description="Insira seu e-mail"/>

                <CustomFormField control={form.control} name="password" label="Senha" type="password" placeholder="********" description="min. 6 caracteres, max. 12"/>

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
