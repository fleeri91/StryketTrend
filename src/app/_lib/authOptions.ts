import NextAuth from 'next-auth'
import { Account, User as AuthUser } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import UserSchema from '@schemas/UserSchema'
import connectDB from '@lib/connectDB'

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        await connectDB()

        const { username, password } = credentials

        // Find user by username
        const user = await UserSchema.findOne({ username })

        // If user does not exist, return null
        if (!user) {
          return null
        }

        // Compare passwords
        const passwordsMatch = await bcrypt.compare(password, user.password)

        // If passwords do not match, return null
        if (!passwordsMatch) {
          return null
        }

        // Return user object if authentication succeeds
        return user
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == 'credentials') {
        return true
      }
    },
    async redirect({ baseUrl }: any) {
      return baseUrl
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
