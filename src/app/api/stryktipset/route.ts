import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.www.svenskaspel.se/external/1/draw/europatipset/draws?accesskey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export const revalidate = 0;
