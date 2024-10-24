import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
  

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const user = { id: "1", email: "j@j.com" };
        if (user) { return user;  }

        console.log("credentials", credentials);
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
