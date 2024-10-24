"use client";

import { signOut } from "next-auth/react"

export default function Home() {
    

    return(
        <>
            <button style={{ marginRight: 10 }} onClick={() => signOut({ callbackUrl: "/login" })}>
                Sign Out
            </button>
        </>
    )
    
}