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

    return passIsValid ? { id: String(userDb.id), email: userDb.email, name: userDb.name } : null;

  } catch (error) {
    console.log("erro: "+error)
    return null;
  }
}

export const authOptions = {
  pages: { signIn: "/login" },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



// const handler = NextAuth({
  
//   // session: { strategy: "jwt" },
//   pages: { signIn: "/login" },

//   callbacks: {
//     jwt({ token, user }) {
//       if (user) { // User is available during sign-in
//         console.log(token)
//         // console.log(user)
//         token.id = user.id
//       }
//       console.log(token)
//       return token
//     },
//     async session({ session, token }) {
//       // Incluindo o `id` na session a partir do token
//       console.log("entrou no session!!")
//       if (token?.id) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: { email: {}, password: {} },
//       authorize
//     }),
//   ],
// });

// export { handler as GET, handler as POST };
