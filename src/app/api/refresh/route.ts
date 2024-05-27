import { NextRequest, NextResponse } from 'next/server';

export default function GET(req: NextRequest) {
  return NextResponse.next({
    status: 200,
    statusText: 'Hello, World!'
  });
}
