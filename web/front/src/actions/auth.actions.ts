"use server"

import { z } from "zod"
import { SignInSchema, SignUpSchema } from "../../types"
import { generateId } from "lucia"
import { prisma } from "@/lib/db"
import { lucia, validateRequest } from "@/lib/lucia"
import * as argon2 from "argon2"
import { setCookie } from "@/lib/actions"

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    console.log("Starting sign up process", values)
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

    console.log("User created successfully", user);

    const session = await lucia.createSession(user.id, {})

    const sessionCookie = lucia.createSessionCookie(session.id)
    await setCookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return {
      success: true,
      data: user,
    }
  } catch (error: any) {
    console.error("Sign up error:", error);
    return {
      error: error?.message || "Failed to create account",
    }
  }
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
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
        error: "Invalid credentials",
      }
    }

    const isValidPassword = await argon2.verify(existingUser.password, values.password)

    if (!isValidPassword) {
      return {
        error: "Invalid credentials",
      }
    }

    const session = await lucia.createSession(existingUser.id, {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
    })

    const sessionCookie = lucia.createSessionCookie(session.id)
    await setCookie(
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
      error: "An error occurred during sign in",
    }
  }
}

export const signOut = async () => {
  try {
    const { session } = await validateRequest()

    if (!session) {
      return {
        error: "Unauthorized",
      }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    await setCookie(
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