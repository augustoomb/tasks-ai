import { getServerSession } from "next-auth";
import WithAssistant from "@/components/initial/WithAssistant";
import WithoutAssistant from "@/components/initial/WithoutAssistant";
import { fetchResponse } from "@/lib/utils";
import { Suspense } from "react";

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
    const session = await getServerSession();
    const email = session?.user?.email || "";
    const response = await fetchResponse(`/user?email=${email}`, "GET");

    const data = await response.json();

    const user: any = data.user;

    if (user.Assistant && user.Assistant.length > 0) {
        return <WithAssistant assistants={user.Assistant} />
    } else {
        return <WithoutAssistant />
    }
    
}
