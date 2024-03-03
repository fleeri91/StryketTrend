// Import necessary modules
import { NextResponse } from 'next/server'
import UserSchema from '@schemas/UserSchema'
import connectDB from '@lib/connectDB'

// Define the serverless function
export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectDB()

    // Extract email from the request body
    const { email } = await request.json()

    // Check if a user with the given email exists
    const existingUser = await UserSchema.findOne({ email }).select('_id')

    // Return the result
    return NextResponse.json({ existingUser })
  } catch (error) {
    // Handle any errors
    console.log(error)
    // Return an error response
    return NextResponse.json({ message: 'An error occured while check if user exists' }, { status: 500 })
  }
}

// Export revalidate value
export const revalidate = 0
