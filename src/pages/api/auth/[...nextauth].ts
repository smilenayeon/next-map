import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvier from "next-auth/providers/google";

const prisma = new PrismaClient();


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    
  // Configure one or more authentication providers
  providers: [
    GoogleProvier({
        clientId: "test",
        clientSecret: "test",
    })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions);