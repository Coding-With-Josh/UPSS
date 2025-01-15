import { NextRequest, NextResponse } from "next/server"
import { SignInSchema } from "../../../../../types"
import { signIn } from "@/actions/auth.actions"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log("Request body:", body)
        
        // Validate the request body against the schema
        const validatedFields = SignInSchema.safeParse(body)
        console.log("Validation result:", validatedFields)
        
        if (!validatedFields.success) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 400 }
            )
        }

        const response = await signIn(validatedFields.data)
        console.log("Sign-in response:", response)

        if (response.error) {
            return NextResponse.json(
                { error: response.error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: true, data: response.data },
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