import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import type { Session, User } from "@prisma/client"

const adapter = new PrismaAdapter(
  prisma.session,
  prisma.user,
)

export { adapter }