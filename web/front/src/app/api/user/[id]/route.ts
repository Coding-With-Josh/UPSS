import { SignUpSchema } from "../../../../../types"
import { validateRequest } from "@/lib/lucia";
import { NextRequest, NextResponse } from "next/server"
import { signUp } from "@/actions/auth.actions"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        // Validate the request body against the schema
       const user = validateRequest()
        
        if (!user) {
            return NextResponse.json(
                { error: "No active user" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { 
                success: true,
                data: user 
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