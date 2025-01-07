import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { validateRequest } from "@/lib/lucia"

export async function middleware(request: NextRequest) {
  const { user } = await validateRequest()

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/my/:path*", "/settings"]
}
