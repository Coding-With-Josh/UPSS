"use server";

import { useFetch } from "@/hooks/useDatabase";
import { db } from "@/lib/db";
import { fakeCourseComplete } from "../../../../../types/fake-data";

export const {
  data: courses,
  loading,
  error,
  refetch,
} = useFetch<"course">("course");

const date = new Date();

console.log("yyyy")

export async function createCourse() {
  "use server"
  try {
    console.log("db ready");
    await db.course.create({
      data: {
        id: fakeCourseComplete().id,
        title: fakeCourseComplete().title,
        description: fakeCourseComplete().description,
        createdAt: fakeCourseComplete().createdAt,
        category: fakeCourseComplete().category,
        updatedAt: fakeCourseComplete().updatedAt,
        teacherId: fakeCourseComplete().teacherId,
      },
    });
  } catch {
    console.log("db not ready");
  }
}
