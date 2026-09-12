import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const ADMIN_TOKEN_SECRET = "tuvi-secret-admin-session-token-2026"

export async function getAdminCredentials() {
  try {
    const admin = await prisma.admin.findFirst({
      orderBy: { createdAt: "asc" },
    })
    if (admin) {
      return {
        id: admin.id,
        username: admin.username,
        password: admin.password,
      }
    }
  } catch (error) {
    console.error("Error reading admin from database:", error)
  }

  // Fallback nếu database chưa có hoặc đang khởi tạo
  return {
    id: "default",
    username: process.env.ADMIN_USERNAME || "admin123",
    password: process.env.ADMIN_PASSWORD || "admin123@",
  }
}

export async function updateAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10)
    const existing = await prisma.admin.findFirst({
      orderBy: { createdAt: "asc" },
    })

    if (existing) {
      await prisma.admin.update({
        where: { id: existing.id },
        data: {
          username,
          password: hashedPassword,
        },
      })
    } else {
      await prisma.admin.create({
        data: {
          username,
          password: hashedPassword,
        },
      })
    }
    return true
  } catch (error) {
    console.error("Error updating admin credentials in database:", error)
    return false
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  return token === ADMIN_TOKEN_SECRET
}
