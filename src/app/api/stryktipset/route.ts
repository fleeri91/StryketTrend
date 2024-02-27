import axios from 'axios';
import { NextResponse } from 'next/server';

import { GAME_TYPE } from 'src/constants';

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.www.svenskaspel.se/external/1/draw/${GAME_TYPE}/draws?accesskey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export const revalidate = 0;
