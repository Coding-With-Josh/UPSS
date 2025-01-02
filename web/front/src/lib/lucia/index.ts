import { Lucia } from "lucia"
import { adapter } from "./adapter"
import { cookies } from "next/headers"
import { cache } from "react"
import { prisma } from "@/lib/db"

// Add custom type for extended user response
type DatabaseUserAttributes = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  name: string | null;
  imageUrl: string | null;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  gender: "MALE" | "FEMALE" | "OTHER" | null;
  class: "JSS1" | "JSS2" | "JSS3" | "SS1" | "SS2" | "SS3";
  arm: "Silver" | "Gold" | "Platinum" | "Copper" | "Mecury" | "Diamond" | "Titanium" | "Silicon";
  status: "ACTIVE" | "INACTIVE" | "EXPELLED";
}

// Declare this before lucia initialization
declare module "lucia" {
  interface DatabaseUserAttributes {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    name: string | null;
    imageUrl: string | null;
    role: "ADMIN" | "TEACHER" | "STUDENT";
    gender: "MALE" | "FEMALE" | "OTHER" | null;
    class: "JSS1" | "JSS2" | "JSS3" | "SS1" | "SS2" | "SS3";
    arm: "Silver" | "Gold" | "Platinum" | "Copper" | "Mecury" | "Diamond" | "Titanium" | "Silicon";
    status: "ACTIVE" | "INACTIVE" | "EXPELLED";
  }
}


export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
})

type ValidateRequestResult = {
  user: (DatabaseUserAttributes & { id: string }) | null;
  session: { id: string; userId: string; expiresAt: Date } | null;
}

export const validateRequest = cache(async (): Promise<ValidateRequestResult> => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId) {
    return {
      user: null,
      session: null
    }
  }

  const result = await lucia.validateSession(sessionId)
  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    // Skip if cookies cannot be modified
  }

  if (!result.user) {
    return {
      user: null,
      session: result.session
    }
  }

  const userData = await prisma.user.findUnique({
    where: { id: result.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      name: true,
      imageUrl: true,
      role: true,
      gender: true,
      class: true,
      arm: true,
      status: true,
    }
  })

  if (!userData) {
    return {
      user: null,
      session: result.session
    }
  }

  return {
    user: userData as DatabaseUserAttributes & { id: string },
    session: result.session
  }
})

// Export the types
export type { DatabaseUserAttributes, ValidateRequestResult }

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
  }
}