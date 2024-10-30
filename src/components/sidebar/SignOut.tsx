"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
    return(
        <>
            <button style={{ marginRight: 10 }} onClick={() => signOut({ callbackUrl: "/login" })}>
                Sair
            </button>
        </>
    )    
}