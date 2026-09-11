import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getAdminCredentials, ADMIN_TOKEN_SECRET, verifyAdminSession } from "@/lib/admin-auth"

export async function GET() {
  const isAuth = await verifyAdminSession()
  return NextResponse.json({ authenticated: isAuth })
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const credentials = getAdminCredentials()

    if (username === credentials.username && password === credentials.password) {
      const cookieStore = await cookies()
      cookieStore.set("admin_session", ADMIN_TOKEN_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({ success: true, message: "Đăng nhập thành công" })
    }

    return NextResponse.json(
      { success: false, message: "Tài khoản hoặc mật khẩu không chính xác" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Lỗi xử lý đăng nhập" },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  return NextResponse.json({ success: true, message: "Đã đăng xuất" })
}
