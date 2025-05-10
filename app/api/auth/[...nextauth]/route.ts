import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: { scope: "public_repo" },  // ✅ allows creating issues
      },
    }),
    
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/signin',
  },

  callbacks: {
    async jwt({ token, account }) {
      // 👇 Save access_token to the JWT
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // 👇 Make accessToken available in session
      session.accessToken = token.accessToken as string
      return session
    },
  },
})

export { handler as GET, handler as POST }
