import { signIn } from "next-auth/react";

export async function loginUser(values: { email: string, password: string }) {
    try {
        const response: any = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (response.ok) {            
            return { success: true };
            
        } else {
            throw new Error(JSON.stringify(response));
        }

    } catch (error) {
        console.error(String(error));
        return { success: false, message: "Credenciais inválidas ou inexistentes. Tente novamente." };
    }   
}