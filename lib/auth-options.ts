import type { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

declare module "next-auth" {
  interface User {
    nickname?: string
  }
  interface Session {
    user: {
      nickname?: string
      id?: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.nickname = user.nickname
      session.user.id = user.id
      return session
    },
  },
}
