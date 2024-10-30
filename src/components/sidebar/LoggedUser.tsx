import { getServerSession } from "next-auth";
import { User2 } from "lucide-react"

export default async function LoggedUser() {
    const session = await getServerSession();

    return(
        <>
            <User2 /><p>{session?.user?.name}</p>
        </>
    )    
}