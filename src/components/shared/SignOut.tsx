"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { deleteCookie } from "@/lib/cookies";
import { useState } from "react";

export default function SignOut() {
    const [loading, setLoading] = useState(false);

    return(
        <button disabled={loading} style={{ width: "100%", display: "flex", alignItems: "center" }} onClick={() => handleClick(setLoading)}>
            {loading ? "Carregando..." : <><LogOut className="mr-2 h-4 w-4" /> Sair</>}
        </button>
    )    
}

async function handleClick(setLoading: any) {
    setLoading(true);

    try {
        await deleteCookie("assistantId")
        await signOut({ callbackUrl: "/login" })
    } catch (error) {
        console.error("Erro ao efetuar logout:", error);
    } finally {
        setLoading(false);
    }    
}
