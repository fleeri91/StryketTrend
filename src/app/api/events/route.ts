import { NextResponse } from 'next/server';
import connectDB from 'src/app/_lib/connectDB';
import EventsSchema from '@schemas/EventsSchema';

export async function GET() {
  try {
    await connectDB();
    const events = await EventsSchema.find();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(error);
  }
}
