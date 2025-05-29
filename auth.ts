// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "./lib/prisma";

const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        // Saat login pertama kali
        token.role = user.role;
        token.email = user.email;
        token.image = user.image;
      } else {
        // Saat token sudah ada tapi role atau image belum ada, ambil dari DB
        if ((!token.role || !token.image) && token.email) {
          const dbUser = await prisma.user.findUnique({
            where: {email: token.email},
          });
          token.role = dbUser?.role ?? "user";
          token.image = dbUser?.image ?? null;
        }
      }
      return token;
    },

    async session({session, token}) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role!;
        session.user.image = token.image ?? null;
      }
      return session;
    },
  },
};

export const {auth, handlers, signIn, signOut} = NextAuth(authConfig);
