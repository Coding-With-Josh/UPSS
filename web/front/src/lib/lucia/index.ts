"use server"
import { Lucia } from "lucia"
import { adapter } from "./adapter"
import { cookies } from "next/headers"
import { cache } from "react"
import { prisma } from "@/lib/db"
import { lucia } from "./lucia"

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

type ValidateRequestResult = {
  user: (DatabaseUserAttributes & { id: string }) | null;
  session: { id: string; userId: string; expiresAt: Date } | null;
}

export const validateRequest = cache(async (): Promise<ValidateRequestResult> => {
  const cookie = await cookies()
  const sessionId = await cookie.get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId) {
    return {
      user: null,
      session: null
    }
  }

  const { user, session } = await lucia.validateSession(sessionId)
  
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookie.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    }

    if (!user) {
      return {
        user: null,
        session
      }
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
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
        session
      }
    }

    return {
      user: userData as DatabaseUserAttributes & { id: string },
      session
    }

  } catch {
    return {
      user: null,
      session: null
    }
  }
})

// Export the types
export type { DatabaseUserAttributes, ValidateRequestResult }