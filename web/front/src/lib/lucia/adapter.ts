import { prisma } from "@/lib/db"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"


export const adapter = new PrismaAdapter(prisma.user, prisma.session)