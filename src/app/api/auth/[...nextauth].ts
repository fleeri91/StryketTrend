import connectDB from '@lib/connectDB'
import UserSchema from '@schemas/UserSchema'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      //@ts-ignore
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
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    },
  },
})
