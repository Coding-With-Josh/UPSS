import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Failed to fetch course:', error)
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, category, teacherId } = body

    const updatedCourse = await prisma.course.update({
      where: { id: params.id },
      data: {
        title,
        description,
        category,
        teacherId,
      },
    })

    return NextResponse.json(updatedCourse)
  } catch (error) {
    console.error('Failed to update course:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.course.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Failed to delete course:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}