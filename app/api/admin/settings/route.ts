import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { verifyAdminSession } from "@/lib/admin-auth"

const configPath = path.join(process.cwd(), "content", "site-config.json")

export async function GET() {
  try {
    if (!fs.existsSync(configPath)) {
      return NextResponse.json({ error: "Config not found" }, { status: 404 })
    }
    const raw = fs.readFileSync(configPath, "utf-8")
    const config = JSON.parse(raw)
    return NextResponse.json({ config })
  } catch (error) {
    return NextResponse.json({ error: "Failed to read config" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newConfig = await request.json()
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), "utf-8")
    return NextResponse.json({ success: true, message: "Cập nhật cấu hình thành công" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 })
  }
}
