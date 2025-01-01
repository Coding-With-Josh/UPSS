"use server"
import { z } from "zod"
import { SignInSchema, SignUpSchema } from "../../types"
import { generateId } from "lucia"
import { prisma } from "@/lib/db"
import { lucia, validateRequest } from "@/lib/lucia"
import { cookies } from "next/headers"
import * as argon2 from "argon2"

const cookie = await cookies()

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const hashedPassword = await argon2.hash(values.password)
  const userId = generateId(15)

  try {
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
        name: `${values.firstName} ${values.lastName}`, // Add this to populate the name field
        status: "ACTIVE", // Set default status
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

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return {
      success: true,
      data: user, // Return the complete user object
    }
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values)
  } catch (error: any) {
    return {
      error: error.message,
    }
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: values.username,
    },
  })

  if (!existingUser) {
    return {
      error: "User not found",
    }
  }

  if (!existingUser.password) {
    return {
      error: "User not found",
    }
  }

  const isValidPassword = await argon2.verify(
    existingUser.password,
    values.password
  )

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password",
    }
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  })

  const sessionCookie = lucia.createSessionCookie(session.id)


  cookie.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return {
    success: "Logged in successfully",
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

    cookie.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  } catch (error: any) {
    return {
      error: error?.message,
    }
  }
}