import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
  interface User {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) token.accessToken = account.access_token
      if (user) {
        token.name = user.name ?? null
        token.email = user.email ?? null
        token.picture = user.image ?? null
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      session.user.name = (token.name as string) ?? session.user.name
      session.user.email = (token.email as string) ?? session.user.email
      session.user.image = (token.picture as string) ?? session.user.image

      return session
    },
  },
})

export { handler as GET, handler as POST }
