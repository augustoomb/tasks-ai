"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { deleteCookie } from "@/lib/cookies";

export default function SignOut() {
    return(
        <button style={{ width: "100%", display: "flex", alignItems: "center" }} onClick={() => onClick()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
        </button>
    )    
}

async function onClick() {
    await deleteCookie("assistantId")
    signOut({ callbackUrl: "/login" })
}
