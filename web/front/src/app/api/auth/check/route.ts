
import { validateRequest } from "@/lib/lucia";
import { NextResponse } from "next/server";

export async function GET() {
  const { user } = await validateRequest();

  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 200 });
}