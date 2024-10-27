import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"; 
import prisma from '@/lib/prisma';
import { comparePass } from "@/lib/utils";

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
}

const authorize = async (credentials: any) => {
  try {
    const { email, password } = credentials || {};
    if (!email || !password) return null;

    const userDb = await findUserByEmail(email);
    if (!userDb) return null;
    
    const passIsValid = await comparePass(password, userDb.password);

    return passIsValid ? { id: String(userDb.id), email: userDb.email } : null;

  } catch (error) {
    console.log("erro: "+error)
    return null;
  }
}

const handler = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },  

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize
    }),
  ],
});

export { handler as GET, handler as POST };
