import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"

const adapter = new PrismaAdapter(
  prisma.session,
  prisma.user,
)

export { adapter }