import NextAuth from 'next-auth'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '@lib/clientPromise'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  ...
})
