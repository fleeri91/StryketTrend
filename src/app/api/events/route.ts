import { NextResponse } from 'next/server';
import connectDB from 'src/app/_lib/connectDB';
import EventSchema from '@schemas/Events.schema';

export async function GET() {
  try {
    await connectDB();
    const events = await EventSchema.find();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(error);
  }
}
