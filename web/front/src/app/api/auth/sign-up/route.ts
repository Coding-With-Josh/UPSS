import { SignUpSchema } from "../../../../../types"
import { NextRequest, NextResponse } from "next/server"
import { signUp } from "@/actions/auth.actions"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        // Validate the request body against the schema
        const validatedFields = SignUpSchema.safeParse(body)
        
        if (!validatedFields.success) {
            return NextResponse.json(
                { error: "Invalid fields" },
                { status: 400 }
            )
        }

        // Call the signUp function with validated data
        const response = await signUp(validatedFields.data)

        if (response.error) {
            return NextResponse.json(
                { error: response.error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { 
                success: true,
                data: response.data 
            },
            { status: 201 }
        )

    } catch (error: any) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}