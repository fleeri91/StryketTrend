import { NextResponse } from 'next/server';
import connectDB from 'src/app/_lib/connectDB';
import GamesSchema from '@schemas/GamesSchema';

export async function GET() {
  try {
    await connectDB();
    const games = await GamesSchema.find();
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json(error);
  }
}
