import { db } from "@/lib/db";

export const fetchCourses = async ({ take = 5, skip = 0 }) => {
  "use server";
  try {
    const results = await db.course.findMany({
      skip,
      take,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        createdAt: true,
        teacherId: true,
        teacher: {
          select: {
            user: true
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    const total = await db.course.count();

    return {
      data: results,
      metadata: {
        hasNextPage: skip + take < total,
        totalPages: Math.ceil(total / take),
      },
    };
  } finally {
    await db.$disconnect();
  }
};
