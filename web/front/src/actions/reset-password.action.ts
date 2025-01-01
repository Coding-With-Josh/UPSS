"use server"

import { ResetPasswordSchema } from "../../types"
import { z } from "zod"
import * as argon2 from "argon2"
import { lucia, validateRequest } from "@/lib/lucia"
import { prisma } from "@/lib/db" // Assuming you have Prisma client configured
import { cookies } from "next/headers"

export const resetPassword = async (
    values: z.infer<typeof ResetPasswordSchema>
) => {
    try {
        try {
            ResetPasswordSchema.parse(values)
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            }
        }

        const { user } = await validateRequest()
        if (!user) {
            return {
                success: false,
                message: "User not found",
            }
        }

        const existedUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        })

        if (!existedUser) {
            return {
                success: false,
                message: "User not found",
            }
        }

        const isValidPassword = await argon2.verify(
            existedUser.password!,
            values.password
        )

        if (!isValidPassword) {
            return {
                success: false,
                message: "Invalid password",
            }
        }

        const hashedPassword = await argon2.hash(values.newPassword)

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        })

        await prisma.session.deleteMany({
            where: {
                userId: user.id,
            },
        })

        const session = await lucia.createSession(existedUser.id, {
            expiresIn: 60 * 60 * 24 * 30,
        })

        const sessionCookie = lucia.createSessionCookie(session.id)

        const cookie = await cookies()

        cookie.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )

        return {
            success: true,
            message: "Password updated",
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        }
    }
}