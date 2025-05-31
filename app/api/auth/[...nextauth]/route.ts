import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type {JWT} from "next-auth/jwt";
import type {User} from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const user = {id: "1", name: "Admin", role: "admin"};
        if (user) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}: {token: JWT; user?: User}) {
      if (user) {
        (token as any).role = (user as any).role;
      }
      return token;
    },
    async session({session, token}: {session: any; token: JWT}) {
      session.user.role = (token as any).role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
