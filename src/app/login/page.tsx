import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image"
// import whitelogo from "@/public/whitelogo.png"


export default function Login() {
    return(
        <main className="flex w-screen h-screen md:px-8 md:py-4 md:gap-x-8">            
            <section className="flex-1 flex justify-center">
                <article className="md:w-1/2 flex flex-col self-center space-y-4">    
                    <Image className="md:hidden place-self-center" src="/whitelogo.png" alt="Logo" width={80} height={80} />                
                    <div className="space-y-4">                                     
                        <h1 className="text-3xl font-bold md:text-left text-center ">Login</h1>
                        <p className="text-sm text-zinc-500">Insira os seus dados para entrar</p>
                    </div>                    
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="fulano@email.com"/>
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="********"/>
                    <Button className="mt-4">Entrar</Button>
                    <div className="text-xs text-center">
                        <p>Esqueci minha senha</p>
                        <p>Não possui uma conta? <span className="underline underline-offset-1">Cadastre-se</span></p>
                    </div>                    
                </article>
            </section>
            <section className="hidden xl:flex-1 xl:flex justify-center bg-zinc-950 rounded-lg">
                <article className="w-1/2 flex flex-col self-center space-y-10">
                    <Image className="place-self-center" src="/whitelogo.png" alt="Logo" width={280} height={280} />
                    <h2 className="text-white font-bold text-center">&quot;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.&quot;</h2>
                </article>
            </section>
        </main>
    )
}