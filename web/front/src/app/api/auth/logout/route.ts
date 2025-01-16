import { NextRequest, NextResponse } from "next/server"
import { signOut } from "@/actions/auth.actions"

export async function POST(req: NextRequest) {
    try {
        const response = await signOut()
        console.log("Sign-in response:", response)

        if (response.error) {
            return NextResponse.json(
                { error: response.error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        )
    } catch (error) {
        console.error("Internal Server Error:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}