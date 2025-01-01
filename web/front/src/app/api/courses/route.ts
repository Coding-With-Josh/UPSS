import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.course.findMany()
    return NextResponse.json(courses)
  } catch (error) {
    console.error('Failed to fetch courses:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, category, teacherId, passMark } = body

    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        category,
        teacherId,
        passMark,
        teacher: {
          connect: { id: teacherId },
        },
      },
    })

    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    console.error('Failed to create course:', error)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}