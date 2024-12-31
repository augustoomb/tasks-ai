import Image from "next/image";

interface HeaderFormProps {
    title: string,
    description: string
}

export default function HeaderForm({ title, description }: HeaderFormProps) {
    return (
        <>
            <Image className="xl:hidden place-self-center" src="/blacklogo.png" alt="Logo" width={100} height={100} />
            <div className="space-y-4">                                     
                <h1 className="text-3xl font-bold md:text-left text-center ">{ title } </h1>
                <p className="text-sm text-zinc-500">{ description }</p>
            </div>   
        </>
    )
}
