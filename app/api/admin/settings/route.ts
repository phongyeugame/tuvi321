import { NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/admin-auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    let config = await prisma.siteConfig.findUnique({
      where: { id: "default" },
    })

    if (!config) {
      config = await prisma.siteConfig.create({
        data: {
          id: "default",
          siteName: "Tra Cứu Tử Vi",
          siteSlogan: "Giải Mã Lá Số Tử Vi Của Riêng Bạn",
          siteDescription: "Website tra cứu tử vi trực tuyến miễn phí, an sao chính xác tuyệt đối. Luận giải chi tiết 12 cung bản mệnh, vận hạn cuộc đời.",
          adminName: "Nguyễn Quốc Trưởng",
          adminPhone: "0865341434",
          hotline: "0865.341.434",
          zalo: "0865341434",
          email: "contact@tuvi.vn",
          announcement: "Chào mừng bạn đến với hệ thống Tra Cứu Tử Vi Đẩu Số",
          showAnnouncement: true,
          footerNote: "Tử Vi Đẩu Số là tinh hoa cổ học phương Đông giúp định hướng và hoàn thiện bản thân.",
        },
      })
    }

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
    const { id, updatedAt, ...dataToSave } = newConfig

    const config = await prisma.siteConfig.upsert({
      where: { id: "default" },
      update: {
        siteName: dataToSave.siteName,
        siteSlogan: dataToSave.siteSlogan,
        siteDescription: dataToSave.siteDescription,
        adminName: dataToSave.adminName,
        adminPhone: dataToSave.adminPhone,
        hotline: dataToSave.hotline,
        zalo: dataToSave.zalo,
        email: dataToSave.email,
        announcement: dataToSave.announcement,
        showAnnouncement: dataToSave.showAnnouncement,
        footerNote: dataToSave.footerNote,
      },
      create: {
        id: "default",
        siteName: dataToSave.siteName || "Tra Cứu Tử Vi",
        siteSlogan: dataToSave.siteSlogan || "Giải Mã Lá Số Tử Vi Của Riêng Bạn",
        siteDescription: dataToSave.siteDescription || "",
        adminName: dataToSave.adminName || "Nguyễn Quốc Trưởng",
        adminPhone: dataToSave.adminPhone || "0865341434",
        hotline: dataToSave.hotline || "0865.341.434",
        zalo: dataToSave.zalo || "0865341434",
        email: dataToSave.email || "contact@tuvi.vn",
        announcement: dataToSave.announcement || "",
        showAnnouncement: dataToSave.showAnnouncement ?? true,
        footerNote: dataToSave.footerNote || "",
      },
    })

    return NextResponse.json({ success: true, message: "Cập nhật cấu hình thành công", config })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 })
  }
}
