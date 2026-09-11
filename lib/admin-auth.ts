import { cookies } from "next/headers"
import fs from "fs"
import path from "path"

export const ADMIN_TOKEN_SECRET = "tuvi-secret-admin-session-token-2026"
const authFilePath = path.join(process.cwd(), "content", "admin-auth.json")

export function getAdminCredentials() {
  try {
    if (fs.existsSync(authFilePath)) {
      const data = fs.readFileSync(authFilePath, "utf-8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading admin credentials:", error)
  }
  return {
    username: process.env.ADMIN_USERNAME || "admin123",
    password: process.env.ADMIN_PASSWORD || "admin123@",
  }
}

export function updateAdminCredentials(username: string, password: string) {
  try {
    const dir = path.dirname(authFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(authFilePath, JSON.stringify({ username, password }, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error updating admin credentials:", error)
    return false
  }
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value
  return token === ADMIN_TOKEN_SECRET
}
