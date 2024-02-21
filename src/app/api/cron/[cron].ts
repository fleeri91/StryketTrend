import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextRequest) {
  const dynamicApiPart = req.nextUrl.pathname.split('/')[3];

  console.log(dynamicApiPart);
}
