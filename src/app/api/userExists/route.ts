import { NextResponse } from 'next/server'

import UserSchema from '@schemas/UserSchema'

import connectDB from '@lib/connectDB'

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email } = await request.json()
    const user = await UserSchema.findOne({ email }).select('_id')
    console.log('User', user)
    return NextResponse.json({ user })
  } catch (error) {
    console.log(error)
  }
}
export const revalidate = 0
