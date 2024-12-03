import { getServerSession } from "next-auth";
import WithAssistant from "@/components/initial/WithAssistant";
import WithoutAssistant from "@/components/initial/WithoutAssistant";
import { fetchResponse } from "@/lib/utils";
import { Suspense } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function InitialPage() {
    return (
        <div className="flex md:w-screen md:h-screen items-center justify-center">
            <Suspense fallback={<p>Carregando...</p>}> 
                <GetUserWithAssistants />
            </Suspense>                
        </div>
    )
}

async function GetUserWithAssistants() {
    const session = await getServerSession(authOptions);

    // const email = session?.user?.email || "";
    const id = session?.user?.id || "";
    const response = await fetchResponse(`/user?id=${id}`, "GET");
    
    const data = await response.json();

    const user: any = data.user;

    if (user.Assistant && user.Assistant.length > 0) {

        const arrIds = user.Assistant.map((assistant: any) => {
            return assistant.id
        })

        return <WithAssistant assistantsIds={arrIds} />
    } else {
        return <WithoutAssistant userId={user.id}/>
    }
    
}
