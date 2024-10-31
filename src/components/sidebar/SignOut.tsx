"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function SignOut() {
    return(
        <button style={{ width: "100%", display: "flex", alignItems: "center" }} onClick={() => signOut({ callbackUrl: "/login" })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
        </button>
    )    
}