import { LoginForm } from "@/components/forms/LoginForm"
import Image from "next/image";

export default function Login() {
    return(
        <main className="flex w-screen h-screen md:px-8 md:py-4 md:gap-x-8">            
            <section className="flex-1 flex justify-center">
                <LoginForm />
            </section>
            <section className="hidden xl:flex-1 xl:flex justify-center bg-zinc-950 rounded-lg">
                <article className="w-1/2 flex flex-col self-center space-y-10">
                    <Image className="place-self-center" src="/whitelogo.png"  alt="Logo" width={280} height={280} />
                    <h2 className="text-white font-bold text-center">&quot;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.&quot;</h2>
                </article>
            </section>
        </main>
    )
}
