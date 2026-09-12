import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { verifyAdminSession, getAdminCredentials, updateAdminCredentials } from "@/lib/admin-auth"

export async function GET() {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const credentials = await getAdminCredentials()
  return NextResponse.json({ username: credentials.username })
}

export async function PUT(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { currentPassword, newUsername, newPassword } = await request.json()

    if (!currentPassword || !newUsername) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ mật khẩu hiện tại và tên tài khoản mới" },
        { status: 400 }
      )
    }

    const currentCreds = await getAdminCredentials()

    // Validate current password (bcrypt hoặc plaintext fallback)
    const isCurrentValid =
      bcrypt.compareSync(currentPassword, currentCreds.password) ||
      currentPassword === currentCreds.password

    if (!isCurrentValid) {
      return NextResponse.json(
        { error: "Mật khẩu hiện tại không chính xác" },
        { status: 400 }
      )
    }

    // Determine password to save: if newPassword provided, use it; otherwise keep current
    const finalPassword = newPassword ? newPassword : currentPassword

    const ok = await updateAdminCredentials(newUsername.trim(), finalPassword)
    if (ok) {
      return NextResponse.json({
        success: true,
        message: "Cập nhật thông tin tài khoản thành công!",
      })
    } else {
      return NextResponse.json(
        { error: "Không thể lưu thông tin tài khoản" },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi hệ thống khi cập nhật tài khoản" },
      { status: 500 }
    )
  }
}
