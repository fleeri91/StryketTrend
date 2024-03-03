import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import UserSchema from '@schemas/UserSchema'

import connectDB from '@lib/connectDB'

import { UserDTO } from 'types/user/UserDTO'

export async function POST(request: Request) {
  try {
    const { user }: { user: UserDTO } = await request.json()
    const hashedPassword = await bcrypt.hash(user.password, 10)

    await connectDB()
    await UserSchema.create({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      admin: false,
    })

    return NextResponse.json({ message: 'User registered' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'An error occured while registering the user' }, { status: 500 })
  }
}
export const revalidate = 0
