"use server"

import { z } from "zod"
import { SignInSchema, SignUpSchema } from "../../types"
import { generateId } from "lucia"
import { prisma } from "@/lib/db"
import { lucia, validateRequest } from "@/lib/lucia"
import * as argon2 from "argon2"
import { cookies } from "next/headers"

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const cookie = await cookies()
  try {
    const hashedPassword = await argon2.hash(values.password)
    const userId = generateId(15)

    const user = await prisma.user.create({
      data: {
        id: userId,
        username: values.username,
        email: values.email,
        password: hashedPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        class: values.class,
        arm: values.arm,
        gender: values.gender,
        name: `${values.firstName} ${values.lastName}`,
        status: "ACTIVE",
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
        imageUrl: true,
        role: true,
        gender: true,
        class: true,
        arm: true,
        status: true,
      },
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true, data: user }
  } catch (error: any) {
    console.error("Sign up error:", error)
    return { error: error?.message || "Failed to create account" }
  }
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  const cookie = await cookies()
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        username: values.username,
      },
      select: {
        id: true,
        password: true,
      },
    })

    if (!existingUser || !existingUser.password) {
      return {
        error: "...",
      }
    }

    const isValidPassword = await argon2.verify(existingUser.password, values.password)

    if (!isValidPassword) {
     return {
        error: "Invalid credentials",
      }
    }

    const session = await lucia.createSession(existingUser.id, {})

    const sessionCookie = lucia.createSessionCookie(session.id)
    await cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return {
      success: true,
      data: existingUser,
    }
  } catch (error: any) {
    return {
      error: error,
    }
  }
}

export const signOut = async () => {
  const cookie = await cookies()
  try {
    const { session } = await validateRequest()

    if (!session) {
      return {
        error: "Unauthorized",
      }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    await cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return { 
      success: true, }
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}